import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
    type?: 'button' | 'submit';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, disabled, onClick, type = 'button', className, tabIndex }: ButtonProps) {
    return (
        <button
            className={twMerge(
                'inline-block max-w-full rounded bg-primary px-14 py-[0.875rem] text-center text-4xl text-white transition-colors hover:bg-black',
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
