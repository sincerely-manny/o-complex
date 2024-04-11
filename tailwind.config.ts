import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.tsx'],
    theme: {
        colors: {
            black: '#000000',
            white: '#FFFFFF',
            primary: '#222222',
            grey: {
                light: '#D9D9D9',
                dark: '#777777',
            },
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', ...fontFamily.sans],
            },
            borderRadius: {
                DEFAULT: '15px',
            },
        },
    },
    plugins: [],
} satisfies Config;
