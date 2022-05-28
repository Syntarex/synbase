import { signOut as logout } from "next-auth/react";
import { Urls } from "../constants/constants.client";

interface ISignOutOptions {
    redirect: boolean;
    autoLogout: boolean;
}

/* This workaround is needed to logout. */
/* https://stackoverflow.com/a/71872588 */
export const signOut = async (options: ISignOutOptions = { redirect: true, autoLogout: false }) => {
    const { redirect, autoLogout } = options;

    const response = await fetch(Urls.ApiLogout.path);

    const { path } = await response.json();

    await logout({ redirect: false });

    if (redirect) {
        window.location.href = !autoLogout ? path : `${path}?auto=true`;
    }
};
