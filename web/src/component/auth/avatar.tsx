"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Fade, Link, Avatar as MuiAvatar, AvatarProps as MuiAvatarProps, Skeleton, Tooltip } from "@mui/material";
import { ReactNode } from "react";

interface AvatarProps {
    href?: string;
    renderOnUnauthenticated?: ReactNode;
    avatarProps?: Omit<MuiAvatarProps, "alt" | "src">;
}

/**
 * Zeigt den Avatar des aktuell eingeloggten Benutzers. Ist der Benutzer nicht eingeloggt, wird ein Login-Button angezeigt.
 */
export const Avatar = ({ href, renderOnUnauthenticated, avatarProps }: AvatarProps) => {
    const session = useUser();

    if (session.isLoading) {
        return <Skeleton variant={"circular"} width={40} height={40} />;
    }

    // Rendere Fallback, wenn kein Benutzer eingeloggt ist
    if (!session.user) {
        return renderOnUnauthenticated ?? null;
    }

    const { nickname = "Benutzer", picture } = session.user;

    // Der Avatar
    const avatar = (
        <Fade in timeout={1000}>
            <MuiAvatar alt={nickname ?? ""} src={picture ?? "/default-avatar.png"} {...avatarProps}>
                {nickname?.substring(0, 2)}
            </MuiAvatar>
        </Fade>
    );

    return (
        <Tooltip title={`Hallo ${nickname ?? ""}! Klicke um dich auszuloggen.`}>
            {href ? <Link href={href}>{avatar}</Link> : avatar}
        </Tooltip>
    );
};
