import MuiLink, { LinkProps } from "@mui/material/Link";
import { ensure } from "@synbase/shared";
import _ from "lodash";
import NextLink from "next/link";
import React from "react";
import { IUrl } from "../../model/url.model";

interface ILinkProps extends Omit<LinkProps, "href"> {
    href: IUrl[] | IUrl;
}

export const Link = (props: ILinkProps) => {
    const { children, href } = props;

    const linkProps = React.useMemo<LinkProps>(() => {
        const last = _.isArray(href) ? _.last(href) : href;

        if (_.isUndefined(last)) {
            // TODO: In URL Objekt auslagern
            return {
                ...props,
                href: "/",
            };
        }

        return {
            ...props,
            href: last.path,
        };
    }, [href]);

    return (
        <NextLink passHref href={ensure(linkProps.href)}>
            <MuiLink {...linkProps}>{children}</MuiLink>
        </NextLink>
    );
};
