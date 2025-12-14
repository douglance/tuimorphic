'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import { useCombinedRefs } from '@/hooks/useCombinedRefs';
import styles from './SidebarLayout.module.scss';

export interface SidebarLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to render in the sidebar panel */
  sidebar: React.ReactNode;
  /** Main content area */
  children: React.ReactNode;
  /** Default sidebar width in pixels */
  defaultSidebarWidth?: number;
  /** Minimum sidebar width in pixels */
  minSidebarWidth?: number;
  /** Maximum sidebar width in pixels */
  maxSidebarWidth?: number;
  /** Whether to show the resize handle */
  showHandle?: boolean;
  /** Whether the sidebar can be collapsed */
  collapsible?: boolean;
  /** Whether the sidebar starts collapsed */
  defaultCollapsed?: boolean;
  /** Which side the sidebar appears on */
  side?: 'left' | 'right';
  /** Additional CSS class names */
  className?: string;
}

/**
 * SidebarLayout component for two-column layouts with resizable sidebar.
 *
 * Provides a navigational panel alongside main content with optional
 * resize handle and collapse functionality. Follows terminal aesthetics
 * with monospace-friendly character-based default widths.
 *
 * Based on SRCL (Sacred Computer) design patterns.
 *
 * @example
 * // Basic usage with left sidebar
 * <SidebarLayout sidebar={<nav>Navigation</nav>}>
 *   <main>Main content</main>
 * </SidebarLayout>
 *
 * @example
 * // Resizable sidebar with custom width
 * <SidebarLayout
 *   sidebar={<nav>Navigation</nav>}
 *   defaultSidebarWidth={200}
 *   minSidebarWidth={150}
 *   maxSidebarWidth={400}
 *   showHandle
 * >
 *   <main>Main content</main>
 * </SidebarLayout>
 *
 * @example
 * // Collapsible right sidebar
 * <SidebarLayout
 *   sidebar={<aside>Details</aside>}
 *   side="right"
 *   collapsible
 *   defaultCollapsed={false}
 * >
 *   <main>Main content</main>
 * </SidebarLayout>
 */
export const SidebarLayout = React.forwardRef<HTMLDivElement, SidebarLayoutProps>(
  function SidebarLayout(
    {
      sidebar,
      children,
      defaultSidebarWidth = 200,
      minSidebarWidth = 100,
      maxSidebarWidth = 500,
      showHandle = false,
      collapsible = false,
      defaultCollapsed = false,
      side = 'left',
      className,
      style,
      ...props
    },
    ref
  ) {
    const [sidebarWidth, setSidebarWidth] = React.useState(defaultSidebarWidth);
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [isDragging, setIsDragging] = React.useState(false);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRefs(ref, containerRef);

    const handleMouseDown = React.useCallback(
      (event: React.MouseEvent) => {
        if (!showHandle) return;

        event.preventDefault();
        setIsDragging(true);
      },
      [showHandle]
    );

    React.useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (event: MouseEvent) => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        let newWidth: number;

        if (side === 'left') {
          newWidth = event.clientX - containerRect.left;
        } else {
          newWidth = containerRect.right - event.clientX;
        }

        const clampedWidth = Math.max(
          minSidebarWidth,
          Math.min(maxSidebarWidth, newWidth)
        );

        setSidebarWidth(clampedWidth);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, minSidebarWidth, maxSidebarWidth, side]);

    const toggleCollapse = React.useCallback(() => {
      setIsCollapsed((prev) => !prev);
    }, []);

    const sidebarStyle: React.CSSProperties = {
      width: isCollapsed ? 0 : sidebarWidth,
      minWidth: isCollapsed ? 0 : undefined,
    };

    const renderSidebarContent = () => (
      <aside
        className={classNames(
          styles.sidebar,
          isCollapsed && styles.collapsed
        )}
        style={sidebarStyle}
        aria-hidden={isCollapsed}
      >
        <div className={styles.sidebarContent}>{sidebar}</div>
      </aside>
    );

    const renderHandle = () => {
      if (!showHandle && !collapsible) return null;

      return (
        <div
          className={classNames(
            styles.handleContainer,
            isDragging && styles.dragging
          )}
        >
          {collapsible && (
            <button
              type="button"
              className={styles.collapseButton}
              onClick={toggleCollapse}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!isCollapsed}
            >
              {isCollapsed ? (side === 'left' ? '[>]' : '[<]') : (side === 'left' ? '[<]' : '[>]')}
            </button>
          )}
          <div
            className={classNames(
              styles.divider,
              isCollapsed && styles.dividerHidden
            )}
            aria-hidden="true"
          />
          {showHandle && !isCollapsed && (
            <div
              className={styles.handle}
              onMouseDown={handleMouseDown}
              role="separator"
              aria-orientation="vertical"
              aria-valuenow={sidebarWidth}
              aria-valuemin={minSidebarWidth}
              aria-valuemax={maxSidebarWidth}
              aria-label="Resize sidebar"
              tabIndex={0}
              onKeyDown={(event) => {
                const step = 10;
                if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  setSidebarWidth((w) =>
                    Math.max(minSidebarWidth, side === 'left' ? w - step : w + step)
                  );
                } else if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  setSidebarWidth((w) =>
                    Math.min(maxSidebarWidth, side === 'left' ? w + step : w - step)
                  );
                }
              }}
            />
          )}
        </div>
      );
    };

    const renderMainContent = () => (
      <main className={styles.main}>
        <div className={styles.mainContent}>{children}</div>
      </main>
    );

    return (
      <div
        ref={combinedRef}
        className={classNames(
          styles.sidebarLayout,
          side === 'left' ? styles.left : styles.right,
          isDragging && styles.isDragging,
          className
        )}
        style={style}
        {...props}
      >
        {side === 'left' ? (
          <>
            {renderSidebarContent()}
            {renderHandle()}
            {renderMainContent()}
          </>
        ) : (
          <>
            {renderMainContent()}
            {renderHandle()}
            {renderSidebarContent()}
          </>
        )}
      </div>
    );
  }
);

export default SidebarLayout;
