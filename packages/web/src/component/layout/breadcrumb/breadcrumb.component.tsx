import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { SxProps, Theme } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import React from "react";
import { Link } from "../../common/link.component";

interface IBreadcrumbProps {
    sx?: SxProps<Theme>;
}

/* TODO: Sieht am Handy schrecklich aus */
export const Breadcrumb = (props: IBreadcrumbProps) => {
    const { sx } = props;

    return (
        <Breadcrumbs sx={sx} separator={<NavigateNextIcon fontSize="small" />}>
            <Link href={"/"} color={"white"} underline={"none"}>
                Discord
            </Link>

            <Link href={"/"} underline={"none"}>
                Server
            </Link>
        </Breadcrumbs>
    );
};
