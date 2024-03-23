import "server-only";

import { initAuth0 } from "@auth0/nextjs-auth0";
import { without } from "lodash";
import { redirect } from "next/navigation";
import { getEnv } from "./env";

/**
 * Konfigurierte Instanz des Auth0-SDKs.
 */
export const auth0 = initAuth0({
    issuerBaseURL: `https://${getEnv("AUTH0_DOMAIN")}`,
    clientID: getEnv("AUTH0_WEB_CLIENT_ID"),
    clientSecret: getEnv("AUTH0_WEB_CLIENT_SECRET"),
    secret: getEnv("AUTH0_SESSION_SECRET"),
    baseURL: getEnv("WEB_URL"),
    authorizationParams: {
        audience: getEnv("AUTH0_WEB_AUDIENCE"),
        connection: "discord",
        scope: "openid profile email read:page:admin create:blog-posts update:blog-posts delete:blog-posts", // TODO: Prüfe, ob es einen .default-scope gibt, der einfach alle Scopes erfrägt
    },
});

interface CheckScopesOptions {
    redirectTo?: string;
}

// TODO: Loggt "nextjs-auth0 is attempting to set cookies from a server component,see https://github.com/auth0/nextjs-auth0#using-this-sdk-with-react-server-components"
/**
 * Prüft die Session des Benutzers auf Scopes.
 * @param requiredScopes Ein Array mit allen benötigten Scopes.
 */
export const checkScopes = async (requiredScopes: string[], { redirectTo }: CheckScopesOptions = {}) => {
    // Die Sitzung des Benutzers
    const session = await auth0.getSession();

    // Die Scopes des Benutzers
    const ownedScopes = (session?.accessTokenScope ?? "").split(" ");

    // Die Scopes die dem Benutzer fehlen
    const missingScopes = without(requiredScopes, ...ownedScopes);

    // Dem Benutzer fehlen Scopes
    if (missingScopes.length > 0) {
        if (redirectTo) {
            redirect(redirectTo);
        }

        return false;
    }

    return true;
};
