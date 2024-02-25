import "use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { DiscordButton } from "../social/discord-button";

export const AuthButton = () => {
    const session = useUser();

    return (
        <DiscordButton
            href={!session.user ? "/api/auth/login" : "/api/auth/logout"}
            color={session.user ? "error" : undefined}
        >
            {!session.user ? "Login" : "Logout"}
        </DiscordButton>
    );
};
