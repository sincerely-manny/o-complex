import { z } from 'zod';
import Review from './review';

const reviewSchema = z.object({
    id: z.number(),
    text: z.string(),
});

const reviewsSchema = z.array(reviewSchema);

const getReviews = () => {
    const r = fetch('http://o-complex.com:1337/reviews')
        .then((res) => res.json())
        .then((data) => {
            const reviews = reviewsSchema.parse(data);
            return { data: reviews };
        })
        .catch(() => {
            throw new Error('Error fetching reviews');
        });
    return r;
};

export default async function Reviews() {
    try {
        const reviews = await getReviews();
        return (
            <div className="grid grid-cols-1 justify-stretch gap-x-6 gap-y-4 sm:grid-cols-2">
                {reviews.data?.map((review) => <Review key={review.id} review={review} />)}
            </div>
        );
    } catch (error) {
        return (
            <div className="rounded bg-grey-light p-5">❌ {(error as Error)?.message || 'Error fetching reviews'}</div>
        );
    }
}
