'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { ProductSchema } from '@/providers/cart';
import Product from './product';

const ApiResponseSchema = z.object({
    page: z.number(),
    amount: z.number(),
    total: z.number(),
    products: z.array(ProductSchema),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

const itemsPerPage = 20;

async function fetchProducts({ pageParam }: { pageParam: number }) {
    const res = await fetch(`http://o-complex.com:1337/products?page=${pageParam}&page_size=${itemsPerPage}`);
    const json = (await res.json()) as unknown;
    const result = ApiResponseSchema.parse(json);
    return result;
}

export default function Products() {
    const productsQuery = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages) => {
            if (lastPage.page * itemsPerPage < lastPage.total) {
                return lastPage.page + 1;
            }
            return undefined;
        },
    });

    if (productsQuery.isLoading) {
        return <div className="text-white">Loading products...</div>;
    }
    if (productsQuery.isError) {
        return <div className="text-white">Error: {productsQuery.error.message}</div>;
    }

    return (
        <div>
            {productsQuery.data?.pages.map((page) => (
                <ul key={page.page} className="grid grid-cols-3 gap-x-9 gap-y-10">
                    {page.products.map((item) => (
                        <Product key={item.id} data={item} />
                    ))}
                </ul>
            ))}
            {productsQuery.hasNextPage && <button onClick={() => productsQuery.fetchNextPage()}>Load more</button>}
        </div>
    );
}
