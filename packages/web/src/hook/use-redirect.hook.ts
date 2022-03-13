import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { IUrl } from "../model/url.model";

export const useRedirect = () => {
    const router = useRouter();

    return React.useCallback(
        (url: IUrl) => {
            console.log(router.pathname);
            console.log(url);
            if (_.isUndefined(router) || _.isEqual(router.pathname, url.path)) {
                return;
            }

            router.push(url.path);
        },
        [router],
    );
};
