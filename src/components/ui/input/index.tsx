import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type IntputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ placeholder, className, onChange, onBlur, value, defaultValue }: IntputProps) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className={twMerge(className)}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            defaultValue={defaultValue}
        />
    );
}
