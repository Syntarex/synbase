import "server-only";

import { CircularProgress, CircularProgressProps } from "@mui/material";
import { ReactNode, Suspense } from "react";

interface LoadingProps {
    children?: ReactNode;
    circularProgressProps?: CircularProgressProps;
    fallback?: ReactNode;
}

export const Loading = ({ children, circularProgressProps, fallback }: LoadingProps) => {
    return <Suspense fallback={fallback ?? <CircularProgress {...circularProgressProps} />}>{children}</Suspense>;
};
