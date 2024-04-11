import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { formatPhoneNumber } from '@/lib/phone';
import type { Dispatch, SetStateAction, ChangeEventHandler, FocusEventHandler } from 'react';

type FormProps = {
    phone: {
        value: string;
        set: Dispatch<SetStateAction<string>>;
    };
};

export default function Form({ phone }: FormProps) {
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
        <form>
            <Input
                name="phone"
                value={phone.value}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                placeholder="+7 (___) ___-__-__"
            />
            <Button>заказать</Button>
        </form>
    );
}
