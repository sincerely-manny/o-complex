/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// eslint-disable-next-line import/extensions
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
    experimental: {
        // swcPlugins: [['next-superjson-plugin', {}]],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.gstatic.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `http://o-complex.com:1337/:path*`,
            },
        ];
    },
};

export default config;
