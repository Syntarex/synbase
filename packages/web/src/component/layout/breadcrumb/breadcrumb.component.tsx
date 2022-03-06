import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { SxProps, Theme } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import _ from "lodash";
import React from "react";
import { useRecoilValue } from "recoil";
import { Urls } from "../../../constants/constants.client";
import { breadcrumbAtom } from "../../../data/layout/breadcrumb.atoms";
import { IUrl } from "../../../model/url.model";
import { Link } from "../../common/link.component";

interface IBreadcrumbProps {
    sx?: SxProps<Theme>;
}

/* TODO: Sieht am Handy schrecklich aus */
export const Breadcrumb = (props: IBreadcrumbProps) => {
    const { sx } = props;

    const breadcrumb = useRecoilValue(breadcrumbAtom);

    const breadcrumbElements = React.useMemo<IUrl[][]>(() => {
        const elements: IUrl[][] = [];
        let lastElement: IUrl[] = [];

        if (_.isEmpty(breadcrumb)) {
            return [[Urls.Home]];
        }

        for (const each of breadcrumb) {
            lastElement = [...lastElement, each];

            elements.push(lastElement);
        }

        return elements;
    }, [breadcrumb]);

    return (
        <Breadcrumbs sx={sx} separator={<NavigateNextIcon fontSize="small" />}>
            {breadcrumbElements.map((element, index) => {
                const last = _.isEqual(index, breadcrumbElements.length - 1);
                const url = _.last(element);

                if (_.isUndefined(url)) {
                    return null;
                }

                const { title } = url;

                return (
                    <Link
                        key={`breadcrumb-${index}`}
                        href={element}
                        color={last ? undefined : "white"}
                        underline={"none"}
                    >
                        {title}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};
