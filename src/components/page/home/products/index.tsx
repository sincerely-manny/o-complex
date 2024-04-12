'use client';

import { ProductSchema } from '@/providers/cart';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { z } from 'zod';
import Product from './product';

const ApiResponseSchema = z.object({
    page: z.number(),
    amount: z.number(),
    total: z.number(),
    products: z.array(ProductSchema),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

const itemsPerPage = 6;

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

    useEffect(() => {
        const loadMoreOnScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                productsQuery.fetchNextPage().catch(() => {});
            }
        };
        window.addEventListener('scroll', loadMoreOnScroll);
        return () => window.removeEventListener('scroll', loadMoreOnScroll);
    }, [productsQuery]);

    if (productsQuery.isLoading) {
        return <div className="text-white">Loading products...</div>;
    }
    if (productsQuery.isError) {
        return <div className="text-white">Error: {productsQuery.error.message}</div>;
    }

    return (
        <>
            <ul className="grid grid-cols-1 gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {productsQuery.data?.pages.map((page) => (
                    <Fragment key={page.page}>
                        {page.products.map((item) => (
                            <Product key={item.id} data={item} />
                        ))}
                    </Fragment>
                ))}
            </ul>
            {productsQuery.isFetchingNextPage && <div className="my-10 text-white">Loading more products...</div>}
        </>
    );
}
