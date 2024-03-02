import "server-only";

import { initAuth0 } from "@auth0/nextjs-auth0";
import { without } from "lodash";
import { RedirectType, redirect } from "next/navigation";
import { getEnv } from "./env";

/**
 * Konfigurierte Instanz des Auth0-SDKs.
 */
const auth0 = initAuth0({
    issuerBaseURL: `https://${getEnv("AUTH0_DOMAIN")}`,
    clientID: getEnv("AUTH0_WEB_CLIENT_ID"),
    clientSecret: getEnv("AUTH0_WEB_CLIENT_SECRET"),
    secret: getEnv("AUTH0_SESSION_SECRET"),
    baseURL: getEnv("WEB_URL"),
    authorizationParams: {
        audience: getEnv("AUTH0_WEB_AUDIENCE"),
        connection: "discord",
        scope: "openid profile email read:page:admin",
    },
});

export default auth0;

// TODO: Loggt "nextjs-auth0 is attempting to set cookies from a server component,see https://github.com/auth0/nextjs-auth0#using-this-sdk-with-react-server-components"

export const checkScopes = async (...requiredScopes: string[]) => {
    // Die Sitzung des Benutzers
    const session = await auth0.getSession();

    // Benutzer ist nicht angemeldet oder hat keine Scopes
    if (!session?.accessTokenScope) {
        redirect("/", RedirectType.replace);
    }

    // Die Scopes des Benutzers
    const ownedScopes = session.accessTokenScope.split(" ");

    // Die Scopes die dem Benutzer fehlen
    const missingScopes = without(requiredScopes, ...ownedScopes);

    // Dem Benutzer fehlen Scopes
    if (missingScopes.length > 0) {
        redirect("/", RedirectType.replace);
    }
};
