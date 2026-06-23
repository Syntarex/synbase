import tailwindcss from "@tailwindcss/vite";
import https from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "astro/config";
import favicon from "astro-favicons";

const plugins = [tailwindcss(), https()];
const integrations = [favicon()];

/** @type {import('astro').AstroConfig} */
export default defineConfig({
    site: `https://synbase.io`,
    integrations,
    vite: {
        plugins,
    },
    markdown: {
        syntaxHighlight: "prism",
    },
    security: { csp: true },
});
