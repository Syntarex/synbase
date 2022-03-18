import MuiLink, { LinkProps } from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import NextLink from "next/link";
import React from "react";
import { IUrl } from "../../../model/url.model";

interface ILinkProps extends Omit<LinkProps, "href"> {
    href: IUrl;
    children?: React.ReactNode;
}

/* TODO: Triggern hier beide links? */
export const Link = (props: ILinkProps) => {
    const { children, href } = props;

    return (
        <NextLink passHref href={href.path}>
            <MuiLink underline={"none"} {...props} href={href.path}>
                {_.isUndefined(children) ? <Typography>{href.title}</Typography> : children}
            </MuiLink>
        </NextLink>
    );
};

export default Link;
