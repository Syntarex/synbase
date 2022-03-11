import _ from "lodash";
import React from "react";
import { RecoilValue, useRecoilValueLoadable } from "recoil";
import { useAddError } from "../../../hook/error/use-errors.hook";

export function useFetch<ReturnType>(selector: RecoilValue<ReturnType>): ReturnType | undefined | Error {
    const [result, setResult] = React.useState<ReturnType | undefined | Error>(undefined);

    const addError = useAddError();
    const fetch = useRecoilValueLoadable(selector);

    React.useEffect(() => {
        switch (fetch.state) {
            case "loading":
                setResult(undefined);
                break;
            case "hasValue":
                setResult(fetch.contents);
                break;
            case "hasError":
                setResult(fetch.contents);
                addError(fetch.contents);
                break;
        }
    }, [fetch]);

    return result;
}

interface IFetchProps<ReturnType> {
    children?: (result: ReturnType) => JSX.Element | null;
    selector: RecoilValue<ReturnType>;
    onLoaded?: (result: ReturnType) => void;
    onLoading?: () => void;
    onError?: (error: Error) => void;
    renderOnError?: (error: Error) => JSX.Element | null;
    renderOnLoading?: () => JSX.Element | null;
}

export function Fetch<ReturnType>(props: IFetchProps<ReturnType>): JSX.Element | null {
    const { children, selector, onLoaded, onLoading, onError, renderOnError, renderOnLoading } = props;

    const result: ReturnType | undefined | Error = useFetch(selector);

    const [onLoadingTriggered, setOnLoadingTriggered] = React.useState<boolean>(false);
    const [onErrorTriggered, setOnErrorTriggered] = React.useState<boolean>(false);
    const [onLoadedTriggered, setOnLoadedTriggered] = React.useState<boolean>(false);

    React.useEffect(() => {
        setOnLoadingTriggered(false);
        setOnErrorTriggered(false);
        setOnLoadedTriggered(false);
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

        if (!onLoadedTriggered && !_.isUndefined(onLoaded) && !_.isError(result) && !_.isUndefined(result)) {
            setOnLoadedTriggered(true);
            onLoaded(result);
        }
    }, [result, onLoaded, onLoading, onError, onLoadingTriggered, onErrorTriggered, onLoadedTriggered]);

    if (_.isUndefined(result)) {
        if (!_.isUndefined(renderOnLoading)) {
            return renderOnLoading();
        }

        return null;
    }

    if (_.isError(result)) {
        if (!_.isUndefined(renderOnError)) {
            return renderOnError(result);
        }

        return null;
    }

    if (_.isUndefined(children)) {
        return null;
    }

    return children(result);
}
