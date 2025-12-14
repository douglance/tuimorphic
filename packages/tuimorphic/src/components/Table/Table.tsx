'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './Table.module.scss';

// ============================================================================
// Table Root
// ============================================================================

export interface TableProps
  extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'className'> {
  /** Table content (TableHeader, TableBody, TableFooter, TableCaption) */
  children: React.ReactNode;
  /** Whether to show borders between cells */
  bordered?: boolean;
  /** Whether to show striped rows with alternating backgrounds */
  striped?: boolean;
  /** Row height: 'compact' for tighter spacing, 'default' for comfortable reading */
  size?: 'compact' | 'default';
  /** Additional CSS class name */
  className?: string;
}

/**
 * Table component with MS-DOS terminal aesthetics.
 *
 * Provides a declarative grid structure for organizing data with monospace
 * alignment and TUI-style borders. Evokes the aesthetics of old terminal
 * interfaces.
 *
 * Based on SRCL (Sacred Computer).
 *
 * @example
 * // Basic table
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Status</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>System A</TableCell>
 *       <TableCell>Online</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 *
 * @example
 * // Bordered and striped table
 * <Table bordered striped size="compact">
 *   <TableCaption>Server Status Report</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Server</TableHead>
 *       <TableHead align="right">CPU</TableHead>
 *       <TableHead align="right">Memory</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>web-01</TableCell>
 *       <TableCell align="right">45%</TableCell>
 *       <TableCell align="right">2.1GB</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
  { children, bordered = false, striped = false, size = 'default', className, ...props },
  ref
) {
  return (
    <table
      ref={ref}
      className={classNames(
        styles.table,
        bordered && styles.bordered,
        striped && styles.striped,
        size === 'compact' && styles.compact,
        className
      )}
      {...props}
    >
      {children}
    </table>
  );
});

// ============================================================================
// Table Header
// ============================================================================

export interface TableHeaderProps
  extends Omit<React.HTMLAttributes<HTMLTableSectionElement>, 'className'> {
  /** TableRow elements containing TableHead cells */
  children?: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

/**
 * TableHeader wraps the table header section.
 *
 * Must contain TableRow elements with TableHead cells.
 * Renders as <thead> with a divider line below.
 */
export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  function TableHeader({ children, className, ...props }, ref) {
    return (
      <thead ref={ref} className={classNames(styles.header, className)} {...props}>
        {children}
      </thead>
    );
  }
);

// ============================================================================
// Table Body
// ============================================================================

export interface TableBodyProps
  extends Omit<React.HTMLAttributes<HTMLTableSectionElement>, 'className'> {
  /** TableRow elements containing TableCell data */
  children?: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

/**
 * TableBody wraps the main data rows of the table.
 *
 * Must contain TableRow elements with TableCell cells.
 * Renders as <tbody>.
 */
export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ children, className, ...props }, ref) {
    return (
      <tbody ref={ref} className={classNames(styles.body, className)} {...props}>
        {children}
      </tbody>
    );
  }
);

// ============================================================================
// Table Footer
// ============================================================================

export interface TableFooterProps
  extends Omit<React.HTMLAttributes<HTMLTableSectionElement>, 'className'> {
  /** TableRow elements for footer content */
  children?: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

/**
 * TableFooter wraps the footer section of the table.
 *
 * Useful for summary rows, totals, or pagination info.
 * Renders as <tfoot> with a divider line above.
 */
export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  function TableFooter({ children, className, ...props }, ref) {
    return (
      <tfoot ref={ref} className={classNames(styles.footer, className)} {...props}>
        {children}
      </tfoot>
    );
  }
);

// ============================================================================
// Table Row
// ============================================================================

export interface TableRowProps
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, 'className'> {
  /** TableHead or TableCell elements */
  children?: React.ReactNode;
  /** Whether this row is selected/highlighted */
  selected?: boolean;
  /** Additional CSS class name */
  className?: string;
}

/**
 * TableRow represents a single row in the table.
 *
 * Can contain TableHead cells (in TableHeader) or TableCell cells (in TableBody/TableFooter).
 * Supports hover states and optional selection highlighting.
 */
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ children, selected = false, className, ...props }, ref) {
    return (
      <tr
        ref={ref}
        className={classNames(styles.row, selected && styles.selected, className)}
        data-selected={selected || undefined}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

// ============================================================================
// Table Head (Header Cell)
// ============================================================================

export interface TableHeadProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'className' | 'align'> {
  /** Header cell content */
  children?: React.ReactNode;
  /** Text alignment within the cell */
  align?: 'left' | 'center' | 'right';
  /** Additional CSS class name */
  className?: string;
}

/**
 * TableHead represents a header cell.
 *
 * Use within TableRow inside TableHeader.
 * Renders as <th> with bold terminal styling.
 */
export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  function TableHead({ children, align = 'left', className, ...props }, ref) {
    return (
      <th
        ref={ref}
        className={classNames(
          styles.head,
          align === 'center' && styles.alignCenter,
          align === 'right' && styles.alignRight,
          className
        )}
        {...props}
      >
        {children}
      </th>
    );
  }
);

// ============================================================================
// Table Cell (Data Cell)
// ============================================================================

export interface TableCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'className' | 'align'> {
  /** Cell content */
  children?: React.ReactNode;
  /** Text alignment within the cell */
  align?: 'left' | 'center' | 'right';
  /** Whether this cell contains numeric data (enables monospace number alignment) */
  numeric?: boolean;
  /** Whether to truncate overflowing text with ellipsis */
  truncate?: boolean;
  /** Additional CSS class name */
  className?: string;
}

/**
 * TableCell represents a data cell.
 *
 * Use within TableRow inside TableBody or TableFooter.
 * Renders as <td> with monospace alignment.
 */
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell(
    { children, align = 'left', numeric = false, truncate = false, className, ...props },
    ref
  ) {
    return (
      <td
        ref={ref}
        className={classNames(
          styles.cell,
          align === 'center' && styles.alignCenter,
          align === 'right' && styles.alignRight,
          numeric && styles.numeric,
          truncate && styles.truncate,
          className
        )}
        {...props}
      >
        {children}
      </td>
    );
  }
);

// ============================================================================
// Table Caption
// ============================================================================

export interface TableCaptionProps
  extends Omit<React.HTMLAttributes<HTMLTableCaptionElement>, 'className'> {
  /** Caption text */
  children?: React.ReactNode;
  /** Position of the caption relative to the table */
  position?: 'top' | 'bottom';
  /** Additional CSS class name */
  className?: string;
}

/**
 * TableCaption provides a title or description for the table.
 *
 * Renders as <caption> element for accessibility.
 * Can be positioned at the top or bottom of the table.
 */
export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ children, position = 'top', className, ...props }, ref) {
    return (
      <caption
        ref={ref}
        className={classNames(
          styles.caption,
          position === 'bottom' && styles.captionBottom,
          className
        )}
        {...props}
      >
        {children}
      </caption>
    );
  }
);

export default Table;
