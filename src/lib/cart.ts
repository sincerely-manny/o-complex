import { useEffect, useState } from 'react';
import { z } from 'zod';

const cartItemSchema = z.object({
    id: z.number(),
    quantity: z.number(),
});

const cartSchema = z.array(cartItemSchema);

type CartItem = z.infer<typeof cartItemSchema>;

export const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                return cartSchema.parse(JSON.parse(storedCart));
            } catch (_error) {
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (id: number) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    return { cart, addToCart, removeFromCart };
};

export default useCart;
