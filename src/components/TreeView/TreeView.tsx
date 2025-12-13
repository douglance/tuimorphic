'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './TreeView.module.scss';

export interface TreeNode {
  /** Unique identifier for the node */
  id: string;
  /** Display label for the node */
  label: string;
  /** Child nodes (makes this a folder/branch) */
  children?: TreeNode[];
  /** Whether this is a file (leaf node without children) */
  isFile?: boolean;
  /** Custom icon to display */
  icon?: React.ReactNode;
}

export interface TreeViewProps {
  /** Tree data structure to render */
  data: TreeNode[];
  /** Node IDs that should be expanded by default */
  defaultExpanded?: string[];
  /** Controlled expanded state */
  expanded?: string[];
  /** Callback when a node is selected */
  onSelect?: (node: TreeNode) => void;
  /** Callback when a node is expanded or collapsed */
  onToggle?: (nodeId: string, expanded: boolean) => void;
  /** Additional CSS class names */
  className?: string;
}

interface TreeNodeRenderProps {
  node: TreeNode;
  level: number;
  isLast: boolean;
  parentPrefixes: boolean[];
  expandedNodes: Set<string>;
  selectedNodeId: string | null;
  onNodeClick: (node: TreeNode) => void;
  onKeyDown: (event: React.KeyboardEvent, node: TreeNode) => void;
}

/**
 * TreeView component for hierarchical file/folder structures.
 *
 * Uses box-drawing characters for a terminal-aesthetic tree display
 * with expandable/collapsible folders and keyboard navigation.
 *
 * @example
 * // Simple file tree
 * const data = [
 *   {
 *     id: 'src',
 *     label: 'src',
 *     children: [
 *       { id: 'index.ts', label: 'index.ts', isFile: true },
 *       {
 *         id: 'components',
 *         label: 'components',
 *         children: [
 *           { id: 'Button.tsx', label: 'Button.tsx', isFile: true },
 *         ],
 *       },
 *     ],
 *   },
 * ];
 * <TreeView data={data} defaultExpanded={['src']} />
 *
 * @example
 * // With selection callback
 * <TreeView
 *   data={fileTree}
 *   onSelect={(node) => console.log('Selected:', node.label)}
 *   onToggle={(id, expanded) => console.log(id, expanded)}
 * />
 *
 * @example
 * // Deeply nested structure
 * const deepTree = [
 *   {
 *     id: 'level-1',
 *     label: 'Level 1',
 *     children: [
 *       {
 *         id: 'level-2',
 *         label: 'Level 2',
 *         children: [
 *           // ... supports 8+ levels of nesting
 *         ],
 *       },
 *     ],
 *   },
 * ];
 * <TreeView data={deepTree} defaultExpanded={['level-1', 'level-2']} />
 */
export const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  function TreeView(
    {
      data,
      defaultExpanded = [],
      expanded: controlledExpanded,
      onSelect,
      onToggle,
      className,
    },
    ref
  ) {
    const [internalExpanded, setInternalExpanded] = React.useState<Set<string>>(
      () => new Set(defaultExpanded)
    );
    const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null);

    const isControlled = controlledExpanded !== undefined;
    const expandedNodes = isControlled
      ? new Set(controlledExpanded)
      : internalExpanded;

    const handleToggle = React.useCallback(
      (nodeId: string) => {
        const isCurrentlyExpanded = expandedNodes.has(nodeId);
        const newExpanded = !isCurrentlyExpanded;

        if (!isControlled) {
          setInternalExpanded((prev) => {
            const next = new Set(prev);
            if (newExpanded) {
              next.add(nodeId);
            } else {
              next.delete(nodeId);
            }
            return next;
          });
        }

        onToggle?.(nodeId, newExpanded);
      },
      [expandedNodes, isControlled, onToggle]
    );

    const handleNodeClick = React.useCallback(
      (node: TreeNode) => {
        setSelectedNodeId(node.id);
        onSelect?.(node);

        // Toggle expansion for folders
        const hasChildren = node.children && node.children.length > 0;
        if (hasChildren && !node.isFile) {
          handleToggle(node.id);
        }
      },
      [onSelect, handleToggle]
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent, node: TreeNode) => {
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = expandedNodes.has(node.id);

        switch (event.key) {
          case 'Enter':
          case ' ':
            event.preventDefault();
            handleNodeClick(node);
            break;

          case 'ArrowRight':
            event.preventDefault();
            if (hasChildren && !node.isFile) {
              if (!isExpanded) {
                handleToggle(node.id);
              }
            }
            break;

          case 'ArrowLeft':
            event.preventDefault();
            if (hasChildren && !node.isFile && isExpanded) {
              handleToggle(node.id);
            }
            break;

          case 'ArrowDown':
          case 'ArrowUp':
            event.preventDefault();
            navigateToSibling(event.currentTarget as HTMLElement, event.key === 'ArrowDown');
            break;
        }
      },
      [expandedNodes, handleNodeClick, handleToggle]
    );

    return (
      <div
        ref={ref}
        className={classNames(styles.root, className)}
        role="tree"
        aria-label="Tree view"
      >
        {data.map((node, index) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            level={0}
            isLast={index === data.length - 1}
            parentPrefixes={[]}
            expandedNodes={expandedNodes}
            selectedNodeId={selectedNodeId}
            onNodeClick={handleNodeClick}
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
    );
  }
);

/**
 * Navigate to the next or previous focusable tree node.
 */
function navigateToSibling(currentElement: HTMLElement, moveDown: boolean): void {
  const treeRoot = currentElement.closest('[role="tree"]');
  if (!treeRoot) return;

  const focusableNodes = Array.from(
    treeRoot.querySelectorAll<HTMLElement>('[role="treeitem"]')
  );

  const currentIndex = focusableNodes.indexOf(currentElement);
  if (currentIndex === -1) return;

  const nextIndex = moveDown ? currentIndex + 1 : currentIndex - 1;
  const nextElement = focusableNodes[nextIndex];

  if (nextElement) {
    nextElement.focus();
  }
}

/**
 * Renders a single tree node with its children.
 */
function TreeNodeComponent({
  node,
  level,
  isLast,
  parentPrefixes,
  expandedNodes,
  selectedNodeId,
  onNodeClick,
  onKeyDown,
}: TreeNodeRenderProps): React.ReactElement {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const isSelected = selectedNodeId === node.id;
  const isFolder = hasChildren && !node.isFile;

  // Build the prefix for this node's line
  const prefixChars = parentPrefixes.map((showLine) => (showLine ? '\u2502   ' : '    '));
  const branchChar = isLast ? '\u2514\u2500\u2500 ' : '\u251C\u2500\u2500 ';

  // Determine the icon to display
  const getIcon = (): React.ReactNode => {
    if (node.icon) {
      return node.icon;
    }
    if (isFolder) {
      return isExpanded ? '[-]' : '[+]';
    }
    return '\u2500';
  };

  // Build prefix array for children
  const childPrefixes = [...parentPrefixes, !isLast];

  return (
    <div className={styles.nodeContainer}>
      <div
        role="treeitem"
        tabIndex={0}
        aria-expanded={isFolder ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-level={level + 1}
        className={classNames(
          styles.node,
          isSelected && styles.selected,
          isFolder && styles.folder
        )}
        onClick={() => onNodeClick(node)}
        onKeyDown={(event) => onKeyDown(event, node)}
      >
        <span className={styles.prefix} aria-hidden="true">
          {level > 0 && prefixChars.join('')}
          {level > 0 && branchChar}
        </span>
        <span className={styles.icon} aria-hidden="true">
          {getIcon()}
        </span>
        <span className={styles.label}>{node.label}</span>
      </div>

      {isFolder && isExpanded && (
        <div role="group" className={styles.children}>
          {node.children!.map((childNode, index) => (
            <TreeNodeComponent
              key={childNode.id}
              node={childNode}
              level={level + 1}
              isLast={index === node.children!.length - 1}
              parentPrefixes={childPrefixes}
              expandedNodes={expandedNodes}
              selectedNodeId={selectedNodeId}
              onNodeClick={onNodeClick}
              onKeyDown={onKeyDown}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeView;
