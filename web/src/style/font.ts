import { Orbitron, Roboto } from "next/font/google";

/**
 * Roboto - eine gut lesbare Schriftart.
 */
export const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

/**
 * Orbitron - eine futuristische Schriftart.
 */
export const orbitron = Orbitron({
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
});
