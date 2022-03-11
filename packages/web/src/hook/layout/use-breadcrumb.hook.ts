import React from "react";
import { useSetRecoilState } from "recoil";
import { breadcrumbAtom } from "../../data/layout/breadcrumb.atoms";
import { IUrl } from "../../model/url.model";

export const useBreadcrumb = (urls: IUrl[]) => {
    const setBreadcrumb = useSetRecoilState(breadcrumbAtom);

    React.useEffect(() => {
        setBreadcrumb(urls);
    }, [urls]);
};
