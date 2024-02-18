"use client";

import { createTheme } from "@mui/material";
import { deDE } from "@mui/material/locale";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

export const synbaseTheme = createTheme(
    {
        palette: {
            mode: "dark",
        },
        typography: {
            fontFamily: roboto.style.fontFamily,
        },
    },
    deDE,
);
