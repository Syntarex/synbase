import React from "react";
import useErrorBoundary from "use-error-boundary";
import { useAddError } from "../../../hook/use-errors.hook";

interface IErrorHandlerProps {
    children: React.ReactNode;
}

export const ErrorHandler = (props: IErrorHandlerProps) => {
    const { children } = props;

    const addError = useAddError();

    const { ErrorBoundary } = useErrorBoundary({
        onDidCatch: (error) => addError(error),
    });

    return <ErrorBoundary>{children}</ErrorBoundary>;
};
