"use client";

import { SxProps, Typography } from "@mui/material";

interface TestProps {
    sx?: SxProps;
}

/**
 * Einfach eine Test-Komponente, welche zum schnellen Prototyping verwendet werden kann.
 */
export const Test = ({ sx }: TestProps) => {
    return <Typography sx={sx}>Test</Typography>;
};
