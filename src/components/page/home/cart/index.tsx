'use client';

import { useState } from 'react';
import Form from './form';

export default function Cart() {
    const [phone, setPhone] = useState('');

    return (
        <div className="bg-grey-light rounded p-3">
            <h3 className="text-4xl">Добавленные товары</h3>
            <ul>
                <li>-</li>
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
