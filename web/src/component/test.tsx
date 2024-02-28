"use client";

import { log } from "@/util/log/client";
import { Typography } from "@mui/material";
import { useEffect } from "react";

interface TestProps {}

/**
 * Einfach eine Test-Komponente, welche zum schnellen Prototyping verwendet werden kann.
 */
export const Test = (props: TestProps) => {
    useEffect(() => log("Test", props), [props]);

    return <Typography>Test</Typography>;
};
