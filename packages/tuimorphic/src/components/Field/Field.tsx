'use client';

import * as React from 'react';
import { Field as BaseField } from '@base-ui/react/field';
import { classNames } from '@/utils/classNames';
import styles from './Field.module.css';

export interface FieldProps {
  /** Field name for forms */
  name?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Manual invalid state */
  invalid?: boolean;
  /** Field content (Label, Control, Description, Error) */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface FieldLabelProps {
  /** Label content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface FieldControlProps {
  /** Element to render (e.g., <input />) */
  render: React.ReactElement;
  /** Additional CSS class names */
  className?: string;
}

export interface FieldDescriptionProps {
  /** Description/help text content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface FieldErrorProps {
  /** Error message content */
  children?: React.ReactNode;
  /** Validity state to match for showing this error. Can be a boolean or a ValidityState key. */
  match?:
    | boolean
    | 'valid'
    | 'valueMissing'
    | 'typeMismatch'
    | 'patternMismatch'
    | 'tooShort'
    | 'tooLong'
    | 'rangeUnderflow'
    | 'rangeOverflow'
    | 'stepMismatch'
    | 'badInput'
    | 'customError';
  /** Additional CSS class names */
  className?: string;
}

export interface FieldValidityProps {
  /** Render function receiving validity state */
  children: (state: { validity: ValidityState; value: unknown }) => React.ReactNode;
}

/**
 * Field component for building accessible form fields with labels, descriptions, and error messages.
 * Wraps form controls with proper accessibility attributes.
 *
 * @example
 * <Field name="email">
 *   <FieldLabel>Email</FieldLabel>
 *   <FieldControl render={<input type="email" required />} />
 *   <FieldDescription>We will never share your email.</FieldDescription>
 *   <FieldError match="valueMissing">Email is required</FieldError>
 *   <FieldError match="typeMismatch">Please enter a valid email</FieldError>
 * </Field>
 */
export function Field({
  name,
  disabled,
  invalid,
  children,
  className,
}: FieldProps) {
  return (
    <BaseField.Root
      name={name}
      disabled={disabled}
      invalid={invalid}
      className={classNames(styles.root, className)}
    >
      {children}
    </BaseField.Root>
  );
}

/**
 * Label element for a Field. Automatically associates with the field control.
 *
 * @example
 * <FieldLabel>Username</FieldLabel>
 */
export function FieldLabel({ children, className }: FieldLabelProps) {
  return (
    <BaseField.Label className={classNames(styles.label, className)}>
      {children}
    </BaseField.Label>
  );
}

/**
 * Wrapper for the form control element. Applies Field context (disabled, invalid states).
 *
 * @example
 * <FieldControl render={<input type="text" />} />
 */
export function FieldControl({ render, className }: FieldControlProps) {
  return <BaseField.Control render={render} className={className} />;
}

/**
 * Description/help text for a Field. Provides additional context for the user.
 *
 * @example
 * <FieldDescription>Must be at least 8 characters</FieldDescription>
 */
export function FieldDescription({ children, className }: FieldDescriptionProps) {
  return (
    <BaseField.Description className={classNames(styles.description, className)}>
      {children}
    </BaseField.Description>
  );
}

/**
 * Error message for a Field. Can be conditionally shown based on validity state.
 *
 * @example
 * <FieldError match="valueMissing">This field is required</FieldError>
 * <FieldError match="typeMismatch">Please enter a valid value</FieldError>
 * <FieldError match={true}>Always show this error</FieldError>
 */
export function FieldError({
  children,
  match,
  className,
}: FieldErrorProps) {
  return (
    <BaseField.Error
      match={match}
      className={classNames(styles.error, className)}
    >
      {children}
    </BaseField.Error>
  );
}

/**
 * Render prop component for accessing field validity state.
 *
 * @example
 * <FieldValidity>
 *   {({ validity, value }) => (
 *     <span>{validity.valid ? 'Valid' : 'Invalid'}: {String(value)}</span>
 *   )}
 * </FieldValidity>
 */
export const FieldValidity = BaseField.Validity;
