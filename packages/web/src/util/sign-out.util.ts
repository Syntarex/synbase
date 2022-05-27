import { signOut as logout } from "next-auth/react";
import { Urls } from "../constants/constants.client";

/* This workaround is needed to logout. */
/* https://stackoverflow.com/a/71872588 */
export const signOut = async () => {
    const response = await fetch(Urls.ApiLogout.path);

    const { path } = await response.json();

    await logout({ redirect: false });

    window.location.href = path;
};
