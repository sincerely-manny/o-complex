import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
    type?: 'button' | 'submit';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, disabled, onClick, type = 'button', className, tabIndex }: ButtonProps) {
    return (
        <button
            className={twMerge(
                'bg-primary inline-block max-w-full rounded px-14 py-3 text-center text-4xl text-white transition-colors hover:bg-black',
                className,
            )}
            type={type === 'submit' ? 'submit' : 'button'}
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
            tabIndex={tabIndex}
        >
            {children}
        </button>
    );
}
