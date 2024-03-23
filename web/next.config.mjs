/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        WEB_URL: process.env.WEB_URL,
        DISCORD_URL: process.env.DISCORD_URL,
        GITHUB_URL: process.env.GITHUB_URL,
        SYNCTUBE_URL: process.env.SYNCTUBE_URL,
        PLAUSIBLE_IFRAME: process.env.PLAUSIBLE_IFRAME,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        // Setze Outpout-Root in Dev-Modus auf Root-Verzeichnis des Projekts. Siehe: https://github.com/vercel/next.js/issues/56887#issuecomment-1826767117
        outputFileTracingRoot: process.env.NODE_ENV === "development" ? "/" : undefined,
    },
};

export default nextConfig;
