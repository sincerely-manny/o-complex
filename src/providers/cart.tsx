'use client';

import { createContext, useContext, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';

import { z } from 'zod';

const cartItemSchema = z.object({
    id: z.number(),
    quantity: z.number(),
});

const cartSchema = z.array(cartItemSchema);

export type CartItem = z.infer<typeof cartItemSchema>;

const storedCart = localStorage.getItem('cart');
let initialCart: CartItem[] = [];
if (storedCart) {
    try {
        initialCart = cartSchema.parse(JSON.parse(storedCart));
    } catch (_error) {
        localStorage.removeItem('cart');
    }
}

export const cartContext = createContext<{
    items: CartItem[];
    set: Dispatch<SetStateAction<CartItem[]>>;
}>({
    items: initialCart,
    set: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>(initialCart);
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    const value = useMemo(() => ({ items: cart, set: setCart }), [cart]);
    return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}

export const useCart = () => {
    const { items: cart, set } = useContext(cartContext);

    const addToCart = (item: CartItem) => {
        set([...cart, item]);
    };

    const removeFromCart = (id: number) => {
        set(cart.filter((item) => item.id !== id));
    };

    const setItemQantity = (id: CartItem['id'], cb: (prevQnty: CartItem['quantity']) => CartItem['quantity']) => {
        const prevItemIndex = cart.findIndex((i) => i.id === id);
        if (prevItemIndex === -1) {
            return;
        }
        const prevItem = cart[prevItemIndex]!;
        const newQnty = cb(prevItem.quantity);
        if (newQnty <= 0) {
            removeFromCart(id);
        }
        const newItem = { ...prevItem, quantity: newQnty };
        cart[prevItemIndex] = newItem;
        set(cart);
    };

    const item = (id: number) => cart.find((i) => i.id === id);

    return { cart, addToCart, removeFromCart, setItemQantity, item };
};
