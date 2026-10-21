import React from 'react';

export interface BaseFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  id?: string;
  className?: string;
}

// ---------------- Input ----------------
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    BaseFieldProps {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      id,
      className = '',
      type = 'text',
      ...rest
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId = error && inputId ? `${inputId}-error` : undefined;

    return (
      <div className={`space-y-1.5 ${className}`}>
        {label ? (
          <label
            htmlFor={inputId}
            className="block text-[14px] font-sans font-normal text-[var(--ink)]"
          >
            {label}
            {required ? <span className="w-1 h-1 bg-[var(--orange)] inline-block ml-1.5 align-middle" aria-hidden="true" /> : null}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`w-full px-3.5 py-2.5 bg-transparent border text-[16px] text-[var(--ink)] font-sans placeholder:text-[var(--muted)] rounded-[2px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] ${
            error
              ? 'border-[var(--ink)] ring-1 ring-[var(--ink)]'
              : 'border-[var(--rule)] hover:border-[var(--ink)] focus:border-[var(--ink)]'
          }`}
          {...rest}
        />
        {error ? (
          <p id={errorId} className="text-[13px] text-[var(--ink)] font-medium font-sans m-0">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-[13px] text-[var(--muted)] font-sans m-0">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

// ---------------- Select ----------------
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    BaseFieldProps {
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      id,
      options,
      placeholder,
      className = '',
      ...rest
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId = error && selectId ? `${selectId}-error` : undefined;

    return (
      <div className={`space-y-1.5 ${className}`}>
        {label ? (
          <label
            htmlFor={selectId}
            className="block text-[14px] font-sans font-normal text-[var(--ink)]"
          >
            {label}
            {required ? <span className="w-1 h-1 bg-[var(--orange)] inline-block ml-1.5 align-middle" aria-hidden="true" /> : null}
          </label>
        ) : null}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            className={`w-full appearance-none px-3.5 py-2.5 bg-transparent border text-[16px] text-[var(--ink)] font-sans rounded-[2px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] cursor-pointer pr-10 ${
              error
                ? 'border-[var(--ink)] ring-1 ring-[var(--ink)]'
                : 'border-[var(--rule)] hover:border-[var(--ink)] focus:border-[var(--ink)]'
            }`}
            {...rest}
          >
            {placeholder ? <option value="">{placeholder}</option> : null}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[var(--white)] text-[var(--ink)]">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[var(--muted)]">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error ? (
          <p id={errorId} className="text-[13px] text-[var(--ink)] font-medium font-sans m-0">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-[13px] text-[var(--muted)] font-sans m-0">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Select.displayName = 'Select';

// ---------------- Textarea ----------------
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseFieldProps {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      id,
      className = '',
      rows = 4,
      ...rest
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId = error && textareaId ? `${textareaId}-error` : undefined;

    return (
      <div className={`space-y-1.5 ${className}`}>
        {label ? (
          <label
            htmlFor={textareaId}
            className="block text-[14px] font-sans font-normal text-[var(--ink)]"
          >
            {label}
            {required ? <span className="w-1 h-1 bg-[var(--orange)] inline-block ml-1.5 align-middle" aria-hidden="true" /> : null}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`w-full px-3.5 py-2.5 bg-transparent border text-[16px] text-[var(--ink)] font-sans placeholder:text-[var(--muted)] rounded-[2px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] resize-y ${
            error
              ? 'border-[var(--ink)] ring-1 ring-[var(--ink)]'
              : 'border-[var(--rule)] hover:border-[var(--ink)] focus:border-[var(--ink)]'
          }`}
          {...rest}
        />
        {error ? (
          <p id={errorId} className="text-[13px] text-[var(--ink)] font-medium font-sans m-0">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-[13px] text-[var(--muted)] font-sans m-0">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
