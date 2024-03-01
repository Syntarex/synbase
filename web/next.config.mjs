/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DISCORD_URL: process.env.DISCORD_URL,
        GITHUB_URL: process.env.GITHUB_URL,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        esmExternals: "loose",
    },
};

export default nextConfig;
