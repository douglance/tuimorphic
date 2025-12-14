'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './Message.module.scss';

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Message content */
  children: React.ReactNode;
  /** Position of the message bubble - left for sender, right for receiver */
  position?: 'left' | 'right';
  /** Author name displayed above the message */
  author?: string;
  /** Timestamp displayed below the message */
  timestamp?: string;
  /** Additional CSS class names */
  className?: string;
}

export interface MessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Message components to render in the list */
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Message component for displaying chat-style messages with MS-DOS terminal aesthetics.
 *
 * Features rectangular speech bubbles with triangular pointers,
 * supporting left/right positioning for conversation flow.
 *
 * Based on SRCL (Sacred Computer).
 *
 * @example
 * <Message position="left" author="Alice" timestamp="10:30 AM">
 *   Hello! How are you?
 * </Message>
 *
 * @example
 * <Message position="right" author="Bob" timestamp="10:31 AM">
 *   I'm doing great, thanks!
 * </Message>
 */
export const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  function Message(
    { children, position = 'left', author, timestamp, className, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={classNames(
          styles.message,
          styles[position],
          className
        )}
        {...props}
      >
        {author && (
          <div className={styles.author}>{author}</div>
        )}
        <div className={styles.bubbleContainer}>
          {position === 'left' && (
            <div className={styles.pointerLeft} aria-hidden="true">
              ◀
            </div>
          )}
          <div className={styles.bubble}>
            <div className={styles.content}>{children}</div>
          </div>
          {position === 'right' && (
            <div className={styles.pointerRight} aria-hidden="true">
              ▶
            </div>
          )}
        </div>
        {timestamp && (
          <div className={styles.timestamp}>{timestamp}</div>
        )}
      </div>
    );
  }
);

/**
 * MessageList component for grouping Message components in a conversation layout.
 *
 * Provides vertical stacking with appropriate spacing for chat interfaces.
 *
 * Based on SRCL (Sacred Computer).
 *
 * @example
 * <MessageList>
 *   <Message position="left" author="Alice">Hello!</Message>
 *   <Message position="right" author="Bob">Hi there!</Message>
 *   <Message position="left" author="Alice">How are you?</Message>
 * </MessageList>
 */
export const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(
  function MessageList({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={classNames(styles.messageList, className)}
        role="log"
        aria-label="Message conversation"
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default Message;
