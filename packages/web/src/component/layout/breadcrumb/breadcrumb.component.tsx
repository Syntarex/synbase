import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { SxProps, Theme } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import _ from "lodash";
import React from "react";
import { useRecoilValue } from "recoil";
import { Urls } from "../../../constants/constants.client";
import { breadcrumbAtom } from "../../../data/layout/breadcrumb.atoms";
import Link from "../../common/link/link.component";

interface IBreadcrumbProps {
    sx?: SxProps<Theme>;
}

/* TODO: Sieht am Handy schrecklich aus */
export const Breadcrumb = (props: IBreadcrumbProps) => {
    const { sx } = props;

    const breadcrumb = useRecoilValue(breadcrumbAtom);

    return (
        <Breadcrumbs sx={sx} separator={<NavigateNextIcon fontSize="small" />}>
            {_.isEmpty(breadcrumb) ? (
                <Link href={Urls.Home} />
            ) : (
                breadcrumb.map((element, index) => {
                    const last = _.isEqual(index, breadcrumb.length - 1);

                    return <Link key={`breadcrumb-${index}`} href={element} color={last ? undefined : "white"} />;
                })
            )}
        </Breadcrumbs>
    );
};
