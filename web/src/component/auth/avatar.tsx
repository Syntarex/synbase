"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from "@mui/material";

/**
 * Zeigt den Avatar des aktuell eingeloggten Benutzers.
 */
export const Avatar = (props: Omit<MuiAvatarProps, "alt" | "src">) => {
    const session = useUser();

    // Rendere nichts, wenn kein Benutzer eingeloggt ist
    if (!session.user) {
        return null;
    }

    const { nickname = "Benutzer", picture } = session.user;

    return (
        <MuiAvatar alt={nickname ?? ""} src={picture ?? undefined} {...props}>
            {nickname?.substring(0, 2)}
        </MuiAvatar>
    );
};
