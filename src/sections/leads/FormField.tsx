import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/cn';

const fieldClass =
  'w-full rounded-[var(--radius-control)] border border-border bg-surface-2 px-4 py-3 text-text outline-none transition-colors placeholder:text-muted focus-visible:border-accent-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet';

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function FieldShell({ id, label, error, children, className }: FieldShellProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm text-muted">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-accent-pink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type InputFieldProps = {
  id: string;
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputField({ id, label, error, className, ...props }: InputFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        className={cn(fieldClass, className)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
    </FieldShell>
  );
}

type TextAreaFieldProps = {
  id: string;
  label: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ id, label, error, className, ...props }: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea
        id={id}
        className={cn(fieldClass, 'min-h-28 resize-y', className)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
    </FieldShell>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({
  id,
  label,
  error,
  children,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <select
        id={id}
        className={cn(fieldClass, className)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}
