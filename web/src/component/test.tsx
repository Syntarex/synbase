"use client";

import { Box, SxProps } from "@mui/material";

interface TestProps {
    sx?: SxProps;
}

/**
 * Einfach eine Test-Komponente, welche zum schnellen Prototyping verwendet werden kann.
 */
export const Test = ({ sx }: TestProps) => {
    return <Box sx={sx}>Test</Box>;
};
