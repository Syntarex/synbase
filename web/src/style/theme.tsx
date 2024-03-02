"use client";

import { SiDiscordHex, SiGithubHex, SiYoutubeHex } from "@icons-pack/react-simple-icons";
import { createTheme } from "@mui/material";
import { deDE } from "@mui/material/locale";
import NextLink from "next/link";
import { Ref, forwardRef } from "react";
import { roboto } from "./font";

/**
 * Ein Komponenten-Proxy, welcher es ermöglicht, dass MuiLink einen NextLink als component entgegennehmen kann.
 */
// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
const LinkBehaviour = forwardRef((props: any, ref: Ref<HTMLAnchorElement>) => {
    return <NextLink ref={ref} {...props} />;
});

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
        components: {
            // Setze NextLink als Link-Komponente
            MuiLink: {
                defaultProps: {
                    component: LinkBehaviour,
                },
            },
            // Setze, innerhalb von Buttons, NextLink als Link-Komponente
            MuiButtonBase: {
                defaultProps: {
                    LinkComponent: LinkBehaviour,
                },
            },
            MuiTab: {
                defaultProps: {
                    LinkComponent: LinkBehaviour,
                },
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
        youtube: theme.palette.augmentColor({
            color: {
                main: SiYoutubeHex,
            },
            name: "youtube",
        }),
    },
});
