import { Link as MuiLink, LinkProps, Typography } from "@mui/material";
import _ from "lodash";
import NextLink from "next/link";
import { IUrl } from "../../../model/url.model";

interface ILinkProps extends Omit<LinkProps, "href"> {
    href: IUrl;
    children?: React.ReactNode;
}

/* TODO: Triggern hier beide Links? */
/* TODO: Es gibt hier ein Best-Practice, welches hier nicht genutzt wird. */
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
