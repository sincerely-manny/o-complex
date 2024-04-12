'use client';

import { formatPhoneNumber } from '@/lib/phone';
import { useCart } from '@/providers/cart';
import { useEffect, useState } from 'react';
import Form from './form';

export default function Cart() {
    const [phone, setPhone] = useState('');
    const { cart } = useCart();

    useEffect(() => {
        const storedPhone = localStorage.getItem('form-phone');
        if (storedPhone) {
            let formatted = formatPhoneNumber(storedPhone);
            if (formatted.length > 18) {
                formatted = formatted.slice(0, 18);
            }
            setPhone(formatPhoneNumber(formatted));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('form-phone', phone);
    }, [phone]);

    return (
        <div className="w-full rounded bg-grey-light p-3 sm:w-[710px]">
            <h3 className="text-4xl">Добавленные товары</h3>
            <ul className="my-5">
                {cart.length ? (
                    cart.map((item) => (
                        <li key={item.item.id}>
                            <span>
                                {item.item.title} {item.quantity}
                            </span>
                        </li>
                    ))
                ) : (
                    <li className="italic">Корзина пуста</li>
                )}
            </ul>
            <Form
                phone={{
                    value: phone,
                    set: setPhone,
                }}
            />
        </div>
    );
}
