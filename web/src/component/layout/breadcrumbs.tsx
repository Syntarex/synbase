"use client";

import { NavigateNext } from "@mui/icons-material";
import { Link, Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { compact, isEmpty } from "lodash";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

// TODO: Serverseitig möglich?
// TODO: Zeigt nicht den Titel der Seite, sondern nur den Slug
/**
 * Zeigt verlinkte Breadcrumbs zur aktuellen URL des Benutzers.
 */
export const Breadcrumbs = () => {
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

            return (
                <Link key={`breadcrumb-${segment}`} href={lastPath} underline={"hover"} color={"inherit"}>
                    {segment}
                </Link>
            );
        });
    }, [path]);

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
