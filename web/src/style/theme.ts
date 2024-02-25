"use client";

import { SiDiscordHex, SiGithubHex } from "@icons-pack/react-simple-icons";
import { createTheme } from "@mui/material";
import { deDE } from "@mui/material/locale";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { roboto } from "./font";

// Setze Sprache von DayJS auf Deutsch
dayjs.locale("de");

// Erstelle Basis-Theme
const theme = createTheme(
    {
        palette: {
            mode: "dark", // Setze Dark-Mode global
        },
        typography: {
            fontFamily: roboto.style.fontFamily,

            h1: {
                fontSize: "4.5rem",
            },
            h2: {
                fontSize: "3.5rem",
            },
            h3: {
                fontSize: "2.5rem",
            },
            h4: {
                fontSize: "2rem",
            },
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
