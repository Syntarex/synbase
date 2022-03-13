import CircularProgress from "@mui/material/CircularProgress";
import _ from "lodash";
import React from "react";
import { useQuery, UseQueryOptions } from "react-query";

export function useFetch<ReturnType>(selector: UseQueryOptions<ReturnType>): ReturnType | undefined | Error {
    const [result, setResult] = React.useState<ReturnType | undefined | Error>(undefined);

    const fetch = useQuery(selector);

    React.useEffect(() => {
        switch (fetch.status) {
            case "error":
                if (_.isError(fetch.error)) {
                    setResult(fetch.error);
                    break;
                }

                setResult(new Error("Unbekannter Fehler."));
                break;
            case "idle":
            case "loading":
                setResult(undefined);
                break;
            case "success":
                setResult(fetch.data);
                break;
        }
    }, [fetch]);

    return result;
}

interface IFetchProps<ReturnType> {
    selector: UseQueryOptions<ReturnType>;
    onSuccess?: (result: ReturnType) => void;
    onLoading?: () => void;
    onError?: (error: Error) => void;
    renderOnSuccess?: (result: ReturnType) => React.ReactNode;
    renderOnError?: (error: Error) => React.ReactNode;
    renderOnLoading?: React.ReactNode;
}

export function Fetch<ReturnType>(props: IFetchProps<ReturnType>): JSX.Element | null {
    const { selector, onSuccess, onLoading, onError, renderOnSuccess, renderOnError, renderOnLoading } = props;

    const result: ReturnType | undefined | Error = useFetch(selector);

    const [onLoadingTriggered, setOnLoadingTriggered] = React.useState<boolean>(false);
    const [onErrorTriggered, setOnErrorTriggered] = React.useState<boolean>(false);
    const [onSuccessTriggered, setOnSuccessTriggered] = React.useState<boolean>(false);

    React.useEffect(() => {
        setOnLoadingTriggered(false);
        setOnErrorTriggered(false);
        setOnSuccessTriggered(false);
    }, [selector]);

    React.useEffect(() => {
        if (!onLoadingTriggered && !_.isUndefined(onLoading) && _.isUndefined(result)) {
            setOnLoadingTriggered(true);
            onLoading();
            return;
        }

        if (_.isError(result) && !onErrorTriggered && !_.isUndefined(onError)) {
            setOnErrorTriggered(true);
            onError(result);

            return;
        }

        if (!onSuccessTriggered && !_.isUndefined(onSuccess) && !_.isError(result) && !_.isUndefined(result)) {
            setOnSuccessTriggered(true);
            onSuccess(result);
        }
    }, [result, onSuccess, onLoading, onError, onLoadingTriggered, onErrorTriggered, onSuccessTriggered]);

    if (_.isUndefined(result)) {
        if (!_.isUndefined(renderOnLoading)) {
            return <>{renderOnLoading}</>;
        }

        return <CircularProgress />;
    }

    if (_.isError(result)) {
        if (!_.isUndefined(renderOnError)) {
            return <>{renderOnError(result)}</>;
        }

        return null;
    }

    if (_.isUndefined(renderOnSuccess)) {
        return null;
    }

    return <>{renderOnSuccess(result)}</>;
}
