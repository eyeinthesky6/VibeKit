// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        ppr: true,
    },
    eslint: {
        ignoreDuringBuilds: true, // Consider removing this in production
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                os: false,
                crypto: false,
            };
        }
        return config;
    },
};
export default nextConfig;
