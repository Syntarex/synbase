"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { ReactNode } from "react";
import { Loading } from "../common/loading";

interface AuthRenderProps {
    children?: ReactNode;
    renderOnUnauthenticated?: ReactNode;
    renderOnLoading?: ReactNode;
}

/**
 * Rendert Elemente, wenn Benutzer eingeloggt ist.
 */
export const AuthRender = ({
    children,
    renderOnLoading = <Loading />,
    renderOnUnauthenticated = null,
}: AuthRenderProps) => {
    const session = useUser();

    // Session lädt noch
    if (session.isLoading) {
        return renderOnLoading;
    }

    // Nicht eingeloggt
    if (!session.user) {
        return renderOnUnauthenticated;
    }

    return children;
};
