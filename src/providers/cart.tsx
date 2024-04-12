'use client';

import { createContext, useContext, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';

import { z } from 'zod';

export const ProductSchema = z.object({
    id: z.number(),
    image_url: z.string(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
});

export type ProductItem = z.infer<typeof ProductSchema>;

const CartItemSchema = z.object({
    quantity: z.number(),
    item: ProductSchema,
});

export type CartItem = z.infer<typeof CartItemSchema>;

const CartSchema = z.array(CartItemSchema);

// let storedCart = '';

// if (typeof localStorage !== 'undefined') {
//     storedCart = localStorage.getItem('cart') ?? '';
// }

// let initialCart: CartItem[] = [];
// if (storedCart) {
//     try {
//         initialCart = CartSchema.parse(JSON.parse(storedCart));
//     } catch (_error) {
//         localStorage.removeItem('cart');
//     }
// }

export const cartContext = createContext<{
    items: CartItem[];
    set: Dispatch<SetStateAction<CartItem[]>>;
}>({
    items: [],
    set: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartInitialized, setCartInitialized] = useState(false);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart') ?? '';
        let initialCart: CartItem[] = [];
        if (storedCart) {
            try {
                initialCart = CartSchema.parse(JSON.parse(storedCart));
                setCart(initialCart);
            } catch (_error) {
                localStorage.removeItem('cart');
            }
        }
        setCartInitialized(true);
    }, []);

    useEffect(() => {
        if (cartInitialized) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, cartInitialized]);
    const value = useMemo(() => ({ items: cart, set: setCart }), [cart]);
    return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}

export const useCart = () => {
    const { items: cart, set } = useContext(cartContext);

    const addToCart = (item: CartItem) => {
        set([...cart, item]);
    };

    const removeFromCart = (id: number) => {
        const newCart = cart.filter((i) => i.item.id !== id);
        set([...newCart]);
    };

    const setItemQantity = (
        id: CartItem['item']['id'],
        cb: (prevQnty: CartItem['quantity']) => CartItem['quantity'],
    ) => {
        const prevItemIndex = cart.findIndex((i) => i.item.id === id);
        if (prevItemIndex === -1) {
            return;
        }
        const prevItem = cart[prevItemIndex]!;
        const newQnty = cb(prevItem.quantity);
        if (newQnty <= 0) {
            removeFromCart(id);
            return;
        }
        const newItem = { ...prevItem, quantity: newQnty };
        cart[prevItemIndex] = newItem;
        set([...cart]);
    };

    const item = (id: number) => cart.find((i) => i?.item?.id === id);

    const emptyCart = () => {
        set([]);
    };

    return { cart, addToCart, removeFromCart, setItemQantity, item, emptyCart };
};
