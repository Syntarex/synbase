import React from "react";
import useErrorBoundary from "use-error-boundary";
import { useAddError } from "../../../hook/use-errors.hook";

interface IErrorBoundaryProps {
    children: React.ReactNode;
}

const ErrorBoundary = (props: IErrorBoundaryProps) => {
    const { children } = props;

    const addError = useAddError();

    const { ErrorBoundary: ErrorBoundaryComponent } = useErrorBoundary({
        onDidCatch: (error) => addError(error),
    });

    return <ErrorBoundaryComponent>{children}</ErrorBoundaryComponent>;
};
export default ErrorBoundary;
