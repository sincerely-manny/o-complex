'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import Form from './form';

export default function Cart() {
    const [phone, setPhone] = useState('');
    const { cart } = useCart();

    return (
        <div className="bg-grey-light max-w-min rounded p-3">
            <h3 className="text-4xl">Добавленные товары</h3>
            <ul>
                {cart.length ? (
                    cart.map((item) => (
                        <li key={item.id}>
                            <span>{item.quantity}</span>
                        </li>
                    ))
                ) : (
                    <li>Корзина пуста</li>
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
