import Cart from '@/components/page/home/cart';
import Products from '@/components/page/home/products';
import Reviews from '@/components/page/home/reviews';
import { Suspense } from 'react';

export default function Home() {
    return (
        <main className="container mx-auto">
            <h1 className="mb-28 mt-14 rounded bg-grey-dark text-center text-8xl leading-[1.375em] text-white">
                тестовое задание
            </h1>
            <section className="mb-60">
                <Suspense fallback={<div>Loading reviews...</div>}>
                    <Reviews />
                </Suspense>
            </section>
            <section className="mb-12 flex justify-center">
                <Cart />
            </section>
            <section>
                <Products />
            </section>
        </main>
    );
}
