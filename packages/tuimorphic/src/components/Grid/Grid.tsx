"use client";

import * as React from "react";
import { classNames } from "@/utils/classNames";
import styles from "./Grid.module.css";

// ============================================================================
// Grid Root
// ============================================================================

export interface GridProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
	/** Grid content (typically GridItem elements or any children) */
	children: React.ReactNode;
	/** Number of columns, or 'auto' for auto-fit responsive columns */
	columns?: number | "auto";
	/** Gap between items in ch units (applies to both row and column gaps) */
	gap?: number;
	/** Gap between rows in ch units (overrides gap for rows) */
	rowGap?: number;
	/** Gap between columns in ch units (overrides gap for columns) */
	columnGap?: number;
	/** Additional CSS class name */
	className?: string;
}

/**
 * Grid component for flexible layout with monospace-aligned spacing.
 *
 * Uses CSS Grid with character-width (`ch`) based gaps for proper TUI alignment.
 * Supports fixed column counts or responsive auto-fit columns.
 *
 * Based on SRCL (Sacred Computer) design principles.
 *
 * @example
 * // Fixed 3-column grid
 * <Grid columns={3} gap={2}>
 *   <GridItem>Item 1</GridItem>
 *   <GridItem>Item 2</GridItem>
 *   <GridItem>Item 3</GridItem>
 * </Grid>
 *
 * @example
 * // Auto-fit responsive grid
 * <Grid columns="auto" gap={4}>
 *   <GridItem>Responsive Item 1</GridItem>
 *   <GridItem>Responsive Item 2</GridItem>
 *   <GridItem>Responsive Item 3</GridItem>
 * </Grid>
 *
 * @example
 * // Grid with spanning items
 * <Grid columns={4} gap={2}>
 *   <GridItem span={2}>Wide Item</GridItem>
 *   <GridItem>Normal Item</GridItem>
 *   <GridItem>Normal Item</GridItem>
 * </Grid>
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(
	{
		children,
		columns = "auto",
		gap = 2,
		rowGap,
		columnGap,
		className,
		style,
		...props
	},
	ref,
) {
	const computedRowGap = rowGap ?? gap;
	const computedColumnGap = columnGap ?? gap;

	const gridStyle: React.CSSProperties = {
		...style,
		"--grid-columns": columns === "auto" ? "auto-fit" : columns,
		"--grid-row-gap": `${computedRowGap}ch`,
		"--grid-column-gap": `${computedColumnGap}ch`,
	} as React.CSSProperties;

	return (
		<div
			ref={ref}
			className={classNames(
				styles.grid,
				columns === "auto" && styles.autoFit,
				className,
			)}
			style={gridStyle}
			{...props}
		>
			{children}
		</div>
	);
});
Grid.displayName = 'Grid';

// ============================================================================
// Grid Item
// ============================================================================

export interface GridItemProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
	/** Grid item content */
	children: React.ReactNode;
	/** Number of columns to span */
	span?: number;
	/** Additional CSS class name */
	className?: string;
}

/**
 * GridItem component for individual items within a Grid.
 *
 * Supports spanning multiple columns for flexible layouts.
 *
 * @example
 * <GridItem>Single column item</GridItem>
 *
 * @example
 * <GridItem span={2}>Item spanning 2 columns</GridItem>
 *
 * @example
 * <GridItem span={3} className="highlight">
 *   Wide highlighted item
 * </GridItem>
 */
export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
	function GridItem({ children, span, className, style, ...props }, ref) {
		const hasSpan = span !== undefined && span > 0;
		const itemStyle: React.CSSProperties = hasSpan
			? ({ ...style, "--grid-item-span": span } as React.CSSProperties)
			: { ...style };

		return (
			<div
				ref={ref}
				className={classNames(
					styles.item,
					hasSpan && styles.spanning,
					className,
				)}
				style={itemStyle}
				{...props}
			>
				{children}
			</div>
		);
	},
);
GridItem.displayName = 'GridItem';

export default Grid;
