'use client';

import Button from '@/components/ui/button';
import { type ProductItem, useCart } from '@/providers/cart';

type AddToCartButtonProps = {
    product: ProductItem;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { item, setItemQantity, addToCart } = useCart();
    const quantity = item(product.id)?.quantity ?? 0;
    if (quantity === 0) {
        return (
            <Button
                onClick={() =>
                    addToCart({
                        quantity: 1,
                        item: product,
                    })
                }
            >
                купить
            </Button>
        );
    }
}
