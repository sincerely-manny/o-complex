import Reviews from '@/components/page/home/reviews';
import { Suspense } from 'react';

export default function Home() {
    return (
        <main className="container mx-auto">
            <section>
                <Suspense fallback={<div>Loading...</div>}>
                    <Reviews />
                </Suspense>
            </section>
        </main>
    );
}
