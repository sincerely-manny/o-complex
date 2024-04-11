import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type IntputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({
    placeholder,
    'aria-label': ariaLabel,
    className,
    onChange,
    onBlur,
    value,
    defaultValue,
    tabIndex,
}: IntputProps) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className={twMerge('bg-primary rounded px-4 text-4xl leading-[1.9em] text-white', className)}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            defaultValue={defaultValue}
            tabIndex={tabIndex}
            aria-label={ariaLabel}
        />
    );
}
