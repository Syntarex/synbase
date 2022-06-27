import useErrorBoundary from "use-error-boundary";
import { useErrors } from "../../../hook/error/use-errors.hook";

interface IErrorBoundaryProps {
    children: React.ReactNode;
}

const ErrorBoundary = (props: IErrorBoundaryProps) => {
    const { children } = props;

    const [, addError] = useErrors();

    const { ErrorBoundary: ErrorBoundaryComponent } = useErrorBoundary({
        onDidCatch: (error) => addError(error),
    });

    return <ErrorBoundaryComponent>{children}</ErrorBoundaryComponent>;
};
export default ErrorBoundary;
