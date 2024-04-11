import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.tsx'],
    theme: {
        colors: {
            black: '#000000',
            white: '#FFFFFF',
            primary: '#222222',
            secondary: '#D9D9D9',
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', ...fontFamily.sans],
            },
        },
    },
    plugins: [],
} satisfies Config;
