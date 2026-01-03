'use client';

import * as React from 'react';
import { Form as BaseForm } from '@base-ui/react/form';
import { classNames } from '@/utils/classNames';
import styles from './Form.module.css';

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Server-side validation errors keyed by field name */
  errors?: Record<string, string | string[]>;
  /**
   * Determines when the form should be validated.
   * - `onSubmit` (default): validates when the form is submitted
   * - `onBlur`: validates when a field loses focus
   * - `onChange`: validates on every change
   * @default 'onSubmit'
   */
  validationMode?: 'onSubmit' | 'onBlur' | 'onChange';
  /**
   * Form submission handler. Called with form values as a JavaScript object.
   * `preventDefault()` is called automatically.
   */
  onFormSubmit?: <FormValues extends Record<string, unknown>>(formValues: FormValues) => void;
  /** Native form submission handler */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  /** Form content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Form component for handling form state and validation.
 *
 * Wraps Base UI Form to provide server-side error handling
 * and validation state management with terminal aesthetics.
 *
 * @example
 * <Form onSubmit={handleSubmit}>
 *   <Input name="email" />
 *   <Button type="submit">Submit</Button>
 * </Form>
 *
 * @example
 * // With server-side errors and onFormSubmit
 * <Form
 *   errors={{ email: 'Invalid email address' }}
 *   onFormSubmit={(values) => console.log(values)}
 * >
 *   <Input name="email" />
 *   <Button type="submit">Submit</Button>
 * </Form>
 */
export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  function Form(
    { errors, validationMode, onFormSubmit, onSubmit, children, className, ...props },
    ref
  ) {
    return (
      <BaseForm
        ref={ref}
        errors={errors}
        validationMode={validationMode}
        onFormSubmit={onFormSubmit}
        onSubmit={onSubmit}
        className={classNames(styles.root, className)}
        {...props}
      >
        {children}
      </BaseForm>
    );
  }
);
Form.displayName = 'Form';

export default Form;
