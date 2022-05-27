import { signOut as logout } from "next-auth/react";

/* This workaround is needed to logout. */
/* https://stackoverflow.com/a/71872588 */
export const signOut = async () => {
    const response = await fetch("/api/auth/logout");

    const { path } = await response.json();

    await logout({ redirect: false });

    window.location.href = path;
};
