import Cart from '@/components/page/home/cart';
import Reviews from '@/components/page/home/reviews';
import { Suspense } from 'react';

export default function Home() {
    return (
        <main className="container mx-auto">
            <h1 className="bg-grey-dark mb-28 mt-14 rounded text-center text-8xl leading-[1.375em] text-white">
                тестовое задание
            </h1>
            <section className="mb-60">
                <Suspense fallback={<div>Loading reviews...</div>}>
                    <Reviews />
                </Suspense>
            </section>
            <section className="flex justify-center">
                <Cart />
            </section>
        </main>
    );
}
