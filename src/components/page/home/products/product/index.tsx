import Image from 'next/image';
import type { ProductItem } from '..';
import AddToCartButton from './add-to-cart';

type ProductProps = {
    data: ProductItem;
};

export default function Product({ data: { id, image_url, description, price, title } }: ProductProps) {
    return (
        <li key={id} className="flex flex-col justify-stretch rounded bg-grey-light p-3">
            <Image
                src={image_url}
                alt={title}
                width={280}
                height={370}
                className="aspect-[280/370] w-full rounded object-cover"
            />
            <h3 className="truncate text-4xl">{title}</h3>
            <p className="line-clamp-[15] grow hyphens-auto" lang="en">
                {description}
            </p>
            <p className="mb-8 text-center text-4xl">цена: ${price}</p>
            <AddToCartButton id={id} />
        </li>
    );
}
