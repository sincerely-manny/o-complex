'use client';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
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
                className="px-0"
            >
                купить
            </Button>
        );
    }
    return (
        <div className="flex items-stretch justify-stretch gap-1.5">
            <Button
                onClick={() => setItemQantity(product.id, (prev) => prev - 1)}
                className="size-[1.9em] shrink-0 px-0"
            >
                -
            </Button>
            <Input
                value={quantity}
                className="w-auto min-w-0 grow text-center"
                onChange={(e) => {
                    setItemQantity(product.id, () => parseInt(e.target.value, 10) || 0);
                }}
            />{' '}
            <Button
                onClick={() => setItemQantity(product.id, (prev) => prev + 1)}
                className="size-[1.9em] shrink-0 px-0"
            >
                +
            </Button>
        </div>
    );
}
