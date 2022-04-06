import _ from "lodash";
import React from "react";
import { useSetRecoilState } from "recoil";
import { breadcrumbAtom } from "../../data/layout/breadcrumb.atoms";
import { IUrl } from "../../model/url.model";

export const useBreadcrumb = (urls: Array<IUrl | undefined>) => {
    const setBreadcrumb = useSetRecoilState(breadcrumbAtom);

    const filtered = React.useMemo<IUrl[]>(() => _.filter(urls, (url) => !_.isUndefined(url)) as IUrl[], [urls]);

    React.useEffect(() => setBreadcrumb(filtered), [filtered]);
};
