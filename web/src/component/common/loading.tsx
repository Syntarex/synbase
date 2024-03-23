"use client";

import { CircularProgress, CircularProgressProps, Stack, Typography } from "@mui/material";
import { sample } from "lodash";
import { ReactNode, Suspense, useMemo } from "react";

// Texte, welche beim Laden angezeigt werden können.
const phrases = [
    "Wir bereiten alles vor 👽",
    "Synbase ist Liebe ♥️",
    "Zeit ist relativ 🫠",
    "Alles wird verkabelt 🪛",
    "The art of doing nothing 🎨",
    "AI übernimmt kurz die Welt 🤖",
    "Zufälle machen das Leben spannend 🎲",
    "Hallo du Mensch da draußen 👋🏼",
    "Mir fällt nichts mehr ein 🥲",
    "Komm mal Discord 🫶🏻",
];

interface LoadingProps {
    children?: ReactNode;
    circularProgressProps?: CircularProgressProps;
    fallback?: ReactNode;
}

export const Loading = ({ children, circularProgressProps, fallback }: LoadingProps) => {
    const phrase = useMemo(() => sample(phrases), []);

    return (
        <Suspense
            fallback={
                fallback ?? (
                    <Stack alignItems={"center"} gap={1}>
                        <CircularProgress {...circularProgressProps} />
                        <Typography variant={"subtitle2"}>{phrase}</Typography>
                    </Stack>
                )
            }
        >
            {children}
        </Suspense>
    );
};
