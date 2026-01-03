'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './Loader.module.css';

/**
 * Animation frame sequences for BlockLoader modes.
 * Each mode cycles through its character array.
 */
const BLOCK_LOADER_MODES: readonly string[][] = [
  // Mode 0: Braille dots (sparse)
  ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'],
  // Mode 1: Braille spinner (dense)
  ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'],
  // Mode 2: Box quadrant
  ['▖', '▘', '▝', '⌞'],
  // Mode 3: Vertical blocks (rising)
  ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄', '▃', '▂'],
  // Mode 4: Horizontal blocks
  ['▉', '▊', '▋', '▌', '▍', '▎', '▏', '▎', '▍', '▌', '▋', '▊'],
  // Mode 5: Arrows (rotating)
  ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'],
  // Mode 6: Box drawing corners
  ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐'],
  // Mode 7: Geometric triangles
  ['◢', '◣', '◤', '◥'],
  // Mode 8: Box corners
  ['◰', '◳', '◲', '◱'],
  // Mode 9: Circle pie quarters
  ['◴', '◷', '◶', '◵'],
  // Mode 10: Circle halves
  ['◐', '◓', '◑', '◒'],
  // Mode 11: Simple dots
  ['.', '..', '...', '..'],
] as const;

export interface BarLoaderProps {
  /** Progress value (0-100). If undefined, runs in indeterminate mode. */
  progress?: number;
  /** Width in characters */
  width?: number;
  /** Character used for filled portion */
  fillChar?: string;
  /** Character used for empty portion */
  emptyChar?: string;
  /** Animation interval in milliseconds (for indeterminate mode) */
  interval?: number;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Horizontal progress bar with terminal-style character display.
 * Supports both determinate (with progress value) and indeterminate (animated) modes.
 *
 * @example
 * // Determinate mode - shows specific progress
 * <BarLoader progress={50} />
 *
 * @example
 * // Indeterminate mode - animated loading
 * <BarLoader />
 *
 * @example
 * // Custom characters and width
 * <BarLoader progress={75} fillChar="=" emptyChar="-" width={30} />
 */
export const BarLoader = React.forwardRef<HTMLDivElement, BarLoaderProps>(
  function BarLoader(
    {
      progress,
      width = 20,
      fillChar = '█',
      emptyChar = '░',
      interval = 100,
      className,
    },
    ref
  ) {
    const [animationPosition, setAnimationPosition] = React.useState(0);
    const [animationDirection, setAnimationDirection] = React.useState<1 | -1>(1);

    const isIndeterminate = progress === undefined;

    React.useEffect(() => {
      if (!isIndeterminate) {
        return;
      }

      const timerId = setInterval(() => {
        setAnimationPosition((previousPosition) => {
          const nextPosition = previousPosition + animationDirection;

          if (nextPosition >= width - 3) {
            setAnimationDirection(-1);
            return width - 3;
          }

          if (nextPosition <= 0) {
            setAnimationDirection(1);
            return 0;
          }

          return nextPosition;
        });
      }, interval);

      return () => {
        clearInterval(timerId);
      };
    }, [isIndeterminate, interval, width, animationDirection]);

    const renderBar = (): string => {
      if (isIndeterminate) {
        // Bouncing animation: a small block moves back and forth
        const indicatorWidth = 3;
        const beforeIndicator = emptyChar.repeat(animationPosition);
        const indicator = fillChar.repeat(indicatorWidth);
        const afterIndicator = emptyChar.repeat(
          Math.max(0, width - animationPosition - indicatorWidth)
        );
        return beforeIndicator + indicator + afterIndicator;
      }

      // Determinate mode: fill based on progress percentage
      const clampedProgress = Math.min(100, Math.max(0, progress));
      const filledCount = Math.round((clampedProgress / 100) * width);
      const emptyCount = width - filledCount;

      return fillChar.repeat(filledCount) + emptyChar.repeat(emptyCount);
    };

    return (
      <div
        ref={ref}
        className={classNames(styles.barLoader, className)}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-busy={isIndeterminate}
      >
        <span className={styles.bar} aria-hidden="true">
          [{renderBar()}]
        </span>
      </div>
    );
  }
);
BarLoader.displayName = 'BarLoader';

export interface BlockLoaderProps {
  /** Animation mode (0-11), each with different character patterns */
  mode?: number;
  /** Animation interval in milliseconds */
  interval?: number;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Single-character animated loader that cycles through Unicode characters.
 * Provides 12 different animation modes with various character patterns.
 *
 * @example
 * // Default braille dots animation
 * <BlockLoader />
 *
 * @example
 * // Dense braille spinner
 * <BlockLoader mode={1} />
 *
 * @example
 * // Rotating arrows with slower speed
 * <BlockLoader mode={5} interval={200} />
 *
 * Animation modes:
 * - 0: Braille dots (sparse) ⠁⠂⠄⡀⢀⠠⠐⠈
 * - 1: Braille spinner (dense) ⣾⣽⣻⢿⡿⣟⣯⣷
 * - 2: Box quadrant ▖▘▝▗
 * - 3: Vertical blocks ▁▂▃▄▅▆▇█
 * - 4: Horizontal blocks ▉▊▋▌▍▎▏
 * - 5: Arrows ←↖↑↗→↘↓↙
 * - 6: Box drawing ┤┘┴└├┌┬┐
 * - 7: Triangles ◢◣◤◥
 * - 8: Box corners ◰◳◲◱
 * - 9: Circle pie ◴◷◶◵
 * - 10: Circle halves ◐◓◑◒
 * - 11: Simple dots ...
 */
export const BlockLoader = React.forwardRef<HTMLSpanElement, BlockLoaderProps>(
  function BlockLoader({ mode = 0, interval = 80, className }, ref) {
    const [frameIndex, setFrameIndex] = React.useState(0);

    // Clamp mode to valid range and get frames with fallback
    const safeMode = Math.min(
      BLOCK_LOADER_MODES.length - 1,
      Math.max(0, Math.floor(mode))
    );
    const frames = BLOCK_LOADER_MODES[safeMode] ?? BLOCK_LOADER_MODES[0]!;
    const frameCount = frames.length;

    React.useEffect(() => {
      const timerId = setInterval(() => {
        setFrameIndex((previousIndex) => (previousIndex + 1) % frameCount);
      }, interval);

      return () => {
        clearInterval(timerId);
      };
    }, [frameCount, interval]);

    // Reset frame index when mode changes
    React.useEffect(() => {
      setFrameIndex(0);
    }, [safeMode]);

    // Get current frame with fallback for type safety
    const currentFrame = frames[frameIndex] ?? frames[0] ?? '⠁';

    return (
      <span
        ref={ref}
        className={classNames(styles.blockLoader, className)}
        role="status"
        aria-label="Loading"
        aria-busy="true"
      >
        {currentFrame}
      </span>
    );
  }
);
BlockLoader.displayName = 'BlockLoader';
