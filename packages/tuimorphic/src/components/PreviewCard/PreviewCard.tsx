'use client';

import * as React from 'react';
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import { classNames } from '@/utils/classNames';
import styles from './PreviewCard.module.css';

export interface PreviewCardProps {
  /** Whether the preview card is open (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Preview card content */
  children?: React.ReactNode;
  /** Element that triggers the preview card on hover */
  trigger?: React.ReactElement;
  /** Additional CSS class names for the popup */
  className?: string;
}

/**
 * PreviewCard component for displaying hover previews of links or content.
 *
 * @example
 * // Simple usage with trigger element
 * <PreviewCard trigger={<a href="#">Hover me</a>}>
 *   <p>Preview content goes here</p>
 * </PreviewCard>
 *
 * @example
 * // With rich content
 * <PreviewCard trigger={<a href="/profile">User Profile</a>}>
 *   <img src="/avatar.png" alt="User avatar" />
 *   <p>John Doe - Software Engineer</p>
 * </PreviewCard>
 *
 * @example
 * // Controlled usage
 * const [open, setOpen] = useState(false);
 * <PreviewCard
 *   open={open}
 *   onOpenChange={setOpen}
 *   trigger={<a href="#">Preview Link</a>}
 * >
 *   <p>Controlled preview content</p>
 * </PreviewCard>
 *
 * @example
 * // Using compound components for advanced control
 * <PreviewCardRoot>
 *   <PreviewCardTrigger render={<a href="#">Typography</a>} />
 *   <PreviewCardPortal>
 *     <PreviewCardPositioner sideOffset={8}>
 *       <PreviewCardPopup>
 *         <PreviewCardArrow />
 *         <p>Preview content with arrow</p>
 *       </PreviewCardPopup>
 *     </PreviewCardPositioner>
 *   </PreviewCardPortal>
 * </PreviewCardRoot>
 */
export function PreviewCard({
  open,
  defaultOpen,
  onOpenChange,
  children,
  trigger,
  className,
}: PreviewCardProps) {
  return (
    <BasePreviewCard.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger && <BasePreviewCard.Trigger render={trigger} />}
      <BasePreviewCard.Portal>
        <BasePreviewCard.Positioner sideOffset={8}>
          <BasePreviewCard.Popup className={classNames(styles.popup, className)}>
            <BasePreviewCard.Arrow className={styles.arrow}>
              <ArrowSvg />
            </BasePreviewCard.Arrow>
            {children}
          </BasePreviewCard.Popup>
        </BasePreviewCard.Positioner>
      </BasePreviewCard.Portal>
    </BasePreviewCard.Root>
  );
}

/**
 * Arrow SVG component for the preview card.
 * Uses terminal-aesthetic styling with solid borders.
 */
function ArrowSvg(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className={styles.arrowFill}
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className={styles.arrowOuterStroke}
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className={styles.arrowInnerStroke}
      />
    </svg>
  );
}

// Export sub-components for advanced usage
export const PreviewCardRoot = BasePreviewCard.Root;
export const PreviewCardTrigger = BasePreviewCard.Trigger;
export const PreviewCardPortal = BasePreviewCard.Portal;

export const PreviewCardBackdrop = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <BasePreviewCard.Backdrop className={classNames(styles.backdrop, className)} {...props} />
);

export const PreviewCardPositioner = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Positioner>) => (
  <BasePreviewCard.Positioner className={className} {...props}>
    {children}
  </BasePreviewCard.Positioner>
);

export const PreviewCardPopup = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
  <BasePreviewCard.Popup className={classNames(styles.popup, className)} {...props}>
    {children}
  </BasePreviewCard.Popup>
);

export const PreviewCardArrow = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
  <BasePreviewCard.Arrow className={classNames(styles.arrow, className)} {...props}>
    {children ?? <ArrowSvg />}
  </BasePreviewCard.Arrow>
);

export default PreviewCard;
