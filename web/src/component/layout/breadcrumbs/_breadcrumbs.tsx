"use client";

import { getBreadcrumbsQuery } from "@/data/client/breadcrumb";
import { NavigateNext } from "@mui/icons-material";
import { Link, Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { compact, find, isEmpty } from "lodash";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

/**
 * Zeigt verlinkte Breadcrumbs zur aktuellen URL des Benutzers.
 */
export const BreadcrumbsClient = () => {
    const { data: overrides } = useSuspenseQuery(getBreadcrumbsQuery());

    // Der relative Pfad
    const path = usePathname();

    // Die Breadcrumbs
    const links = useMemo(() => {
        // Die einzelnen Segmente des relativen Pfads
        const segments = compact(path.split("/"));

        // Der zuletzt gemappte Pfad
        let lastPath = "";

        return segments.map((segment) => {
            lastPath += `/${segment}`;

            const override = find(overrides, (each) => each.path === lastPath) ?? null;

            return (
                <Link key={`breadcrumb-${segment}`} href={lastPath} underline={"hover"} color={"inherit"}>
                    {override?.title ?? segment}
                </Link>
            );
        });
    }, [path, overrides]);

    // Wir sind auf der Startseite
    if (isEmpty(links)) {
        return null;
    }

    return (
        <MuiBreadcrumbs separator={<NavigateNext fontSize={"small"} />}>
            {[
                <Link key={`breadcrumb-home`} href={"/"} underline={"hover"} color={"inherit"}>
                    Startseite
                </Link>,
                ...links,
            ]}
        </MuiBreadcrumbs>
    );
};
