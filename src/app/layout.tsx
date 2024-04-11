import ReactQueryClientProvider from '@/providers/queryclient';
import '@/styles/globals.css';

import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-sans',
});

export const metadata = {
    title: 'O-Complex test',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryClientProvider>
            <html lang="ru">
                <body className={`bg-primary p-6 font-sans text-2xl text-black ${inter.variable}`}>{children}</body>
            </html>
        </ReactQueryClientProvider>
    );
}
