import React from "react";
import useErrorBoundary from "use-error-boundary";

interface IErrorHandlerProps {
    children: React.ReactNode;
}

export const ErrorHandler = (props: IErrorHandlerProps) => {
    const { children } = props;

    const { ErrorBoundary, didCatch, error, reset } = useErrorBoundary({
        onDidCatch: (error: Error) => {
            console.log("--- Catched");
            console.log(error);
            console.log("----------");
        },
    });

    React.useEffect(() => {
        console.log("--- Changed");
        console.log(didCatch);
        console.log(error);
        console.log(reset);
        console.log("----------");
    }, [didCatch, error, reset]);

    return <ErrorBoundary>{children}</ErrorBoundary>;
};
