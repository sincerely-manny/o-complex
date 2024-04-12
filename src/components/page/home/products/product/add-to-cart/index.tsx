'use client';

import Button from '@/components/ui/button';
import { useCart } from '@/providers/cart';

type AddToCartButtonProps = {
    id: number;
};

export default function AddToCartButton({ id }: AddToCartButtonProps) {
    const { item, setItemQantity, addToCart } = useCart();
    const quantity = item(id) ?? 0;
    if (quantity === 0) {
        return <Button onClick={() => addToCart({ id, quantity: 1 })}>купить</Button>;
    }
}
