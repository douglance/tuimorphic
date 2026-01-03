'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './Avatar.module.css';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Initials to display when no image is provided or image fails to load */
  initials?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Optional link URL - renders as anchor when provided */
  href?: string;
  /** Link target (e.g., "_blank") */
  target?: string;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Avatar component for displaying user images, initials, or icons.
 *
 * Provides visual identification for users within interfaces.
 * Supports image display with automatic fallback to initials when image
 * is unavailable or fails to load.
 *
 * @example
 * // With image
 * <Avatar src="/user.jpg" alt="John Doe" />
 *
 * @example
 * // With initials fallback
 * <Avatar initials="JD" />
 *
 * @example
 * // As a link
 * <Avatar src="/user.jpg" href="/profile" />
 *
 * @example
 * // Different sizes
 * <Avatar initials="SM" size="small" />
 * <Avatar initials="MD" size="medium" />
 * <Avatar initials="LG" size="large" />
 */
export const Avatar = React.forwardRef<
  HTMLAnchorElement | HTMLSpanElement,
  AvatarProps
>(function Avatar(
  { src, alt = '', initials, size = 'medium', href, target, className },
  ref
) {
  const [imageLoadFailed, setImageLoadFailed] = React.useState(false);

  const handleImageError = React.useCallback(() => {
    setImageLoadFailed(true);
  }, []);

  // Reset image load state when src changes
  React.useEffect(() => {
    setImageLoadFailed(false);
  }, [src]);

  const shouldShowImage = src && !imageLoadFailed;
  const shouldShowInitials = !shouldShowImage && initials;

  const avatarClassName = classNames(
    styles.avatar,
    styles[size],
    className
  );

  const content = (
    <>
      {shouldShowImage && (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onError={handleImageError}
        />
      )}
      {shouldShowInitials && (
        <span className={styles.initials} aria-label={alt || initials}>
          {initials.slice(0, 2).toUpperCase()}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={avatarClassName}
        aria-label={alt || initials}
      >
        {content}
      </a>
    );
  }

  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={avatarClassName}
      role="img"
      aria-label={alt || initials}
    >
      {content}
    </span>
  );
});
Avatar.displayName = 'Avatar';

export default Avatar;
