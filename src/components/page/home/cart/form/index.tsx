import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { formatPhoneNumber } from '@/lib/phone';
import type { Dispatch, SetStateAction, ChangeEventHandler, FocusEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';

type FormProps = {
    phone: {
        value: string;
        set: Dispatch<SetStateAction<string>>;
    };
    className?: string;
};

export default function Form({ phone, className = '' }: FormProps) {
    const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.target;
        phone.set(value.replaceAll(/[^-\d +()]/g, ''));
    };
    const handlePhoneBlur: FocusEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.target;
        let formatted = formatPhoneNumber(value);
        if (formatted.length > 18) {
            formatted = formatted.slice(0, 18);
        }
        phone.set(formatted);
    };
    return (
        <form className={twMerge(className)}>
            <div className="flex w-full flex-wrap items-stretch justify-stretch gap-4">
                <Input
                    name="phone"
                    value={phone.value}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full sm:w-96"
                    tabIndex={0}
                    aria-label="Телефон"
                />
                <Button tabIndex={0} className="grow px-0">
                    заказать
                </Button>
            </div>
        </form>
    );
}
