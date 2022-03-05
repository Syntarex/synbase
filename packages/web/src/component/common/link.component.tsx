import MuiLink, { LinkProps } from "@mui/material/Link";
import _ from "lodash";
import NextLink from "next/link";
import React from "react";

export const Link = (props: LinkProps) => {
    const { children, href } = props;

    if (_.isUndefined(href)) {
        return null;
    }

    return (
        <NextLink passHref href={href}>
            <MuiLink {...props}>{children}</MuiLink>
        </NextLink>
    );
};
