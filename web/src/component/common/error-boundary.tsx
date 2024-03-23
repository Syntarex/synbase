"use client";

import { fail } from "@/util/log";
import { Alert, AlertProps } from "@mui/material";
import { ReactNode } from "react";
import { useErrorBoundary } from "use-error-boundary";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    alertProps?: AlertProps;
}

/**
 * Ermöglicht einen Fallback für Laufzeit-Fehler.
 * Wird ein Fehler, innerhalb der children geworfen, wird ein Fallback-UI gerendert.
 */
export const ErrorBoundary = ({ children, fallback, alertProps }: ErrorBoundaryProps) => {
    const { ErrorBoundary, reset } = useErrorBoundary({
        onDidCatch: (error, errorInfo) => {
            fail(error);
            fail(errorInfo);
        },
    });

    return (
        <ErrorBoundary
            render={() => children}
            renderError={(error) =>
                fallback ? (
                    fallback
                ) : (
                    <Alert severity={"error"} onClose={() => reset()} {...alertProps}>
                        {error.error.message}
                    </Alert>
                )
            }
        />
    );
};
