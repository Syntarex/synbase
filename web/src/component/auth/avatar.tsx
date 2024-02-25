"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { AvatarProps, Fade, Avatar as MuiAvatar, Tooltip } from "@mui/material";
import { useEffect } from "react";

/**
 * Zeigt den Avatar des aktuell eingeloggten Benutzers.
 */
export const Avatar = (props: Omit<AvatarProps, "alt" | "src">) => {
    const session = useUser();

    useEffect(() => console.log("Avatar", session), [session]);

    // Nicht eingeloggt
    if (!session.user) {
        return null;
    }

    const { nickname = "Benutzer", picture } = session.user;

    return (
        <Tooltip title={`Eingeloggt als ${nickname ?? ""}`}>
            <Fade in timeout={1000}>
                <MuiAvatar alt={nickname ?? ""} src={picture ?? "/default-avatar.png"} {...props}>
                    {nickname}
                </MuiAvatar>
            </Fade>
        </Tooltip>
    );
};
