"use client";

import { SiDiscordHex, SiGithubHex } from "@icons-pack/react-simple-icons";
import { createTheme } from "@mui/material";
import { deDE } from "@mui/material/locale";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { Roboto } from "next/font/google";

// Setze Sprache von DayJS auf Deutsch
dayjs.locale("de");

// Initialisiere Roboto-Font über Google Web Fonts
const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

// Erstelle Basis-Theme
const theme = createTheme(
    {
        palette: {
            mode: "dark", // Setze Dark-Mode global
        },
        typography: {
            fontFamily: roboto.style.fontFamily,
        },
    },
    deDE,
);

// Erweitere Basis-Theme um zusätzliche Farben
export const synbaseTheme = createTheme(theme, {
    palette: {
        // Füge Discord-Farbe hinzu
        discord: theme.palette.augmentColor({
            color: {
                main: SiDiscordHex,
            },
            name: "discord",
        }),
        github: theme.palette.augmentColor({
            color: {
                main: SiGithubHex,
            },
            name: "github",
        }),
    },
});
