'use client';

import { formatPhoneNumber, phoneNumberRegex } from '@/lib/phone';
import { useCart } from '@/providers/cart';
import { useMutation } from '@tanstack/react-query';
import { Fragment, useEffect, useState, type FormEventHandler } from 'react';
import { z } from 'zod';
import Form from './form';

type Order = {
    phone: string;
    cart: {
        id: number;
        quantity: number;
    }[];
};

type OrderResponse =
    | {
          success: 1;
      }
    | {
          success: 0;
          error: string;
      };

const phoneSchema = z.string().regex(phoneNumberRegex);

const sendOrder = async (data: Order): Promise<OrderResponse> => {
    const response = await fetch('http://o-complex.com:1337/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Ошибка при оформлении заказа');
    }
    const res = (await response.json()) as OrderResponse;
    if (res.success === 0 && res.error) {
        throw new Error(res.error);
    } else if (res.success === 1) {
        return res;
    } else {
        throw new Error('Неизвестная ошибка при оформлении заказа');
    }
};

export default function Cart() {
    const [phone, setPhone] = useState('');
    const { cart, emptyCart } = useCart();
    const [orderIsSucces, setOrderIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(null);
    }, [cart, phone]);

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

    const orderMutation = useMutation({
        mutationFn: sendOrder,
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!phoneSchema.safeParse(phone).success) {
            setError('Некорректный номер телефона');
            return;
        }
        orderMutation
            .mutateAsync({
                phone: phone.replace(/\D/g, ''),
                cart: cart.map((item) => ({
                    id: item.item.id,
                    quantity: item.quantity,
                })),
            })
            .then((res) => {
                if (res.success === 1) {
                    emptyCart();
                    setOrderIsSuccess(true);
                }
            })
            .catch((err) => {
                setError((err as Error).message);
            });
    };

    return (
        <div className="w-full rounded bg-grey-light p-3 sm:w-[710px]">
            <h3 className="text-4xl">Добавленные товары</h3>
            <div className="my-5 grid grid-cols-[1fr_3em_1fr] gap-x-4">
                {cart.length ? (
                    cart.map((item) => (
                        <Fragment key={item.item.id}>
                            <span className="truncate">{item.item.title}</span>
                            <span>x{item.quantity}</span>
                            <span>{item.item.price}₽</span>
                        </Fragment>
                    ))
                ) : (
                    <p className="italic">{orderIsSucces ? 'Заказ успешно оформлен' : 'Корзина пуста'}</p>
                )}
            </div>
            {error && <p>❌ {error}</p>}
            {orderMutation.isPending && <p>Отправка заказа...</p>}
            {!orderIsSucces && (
                <Form
                    phone={{
                        value: phone,
                        set: setPhone,
                    }}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
}
