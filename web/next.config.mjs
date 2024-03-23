/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DISCORD_URL: process.env.DISCORD_URL,
        GITHUB_URL: process.env.GITHUB_URL,
        SYNCTUBE_URL: process.env.SYNCTUBE_URL,
        PLAUSIBLE_IFRAME: process.env.PLAUSIBLE_IFRAME,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
