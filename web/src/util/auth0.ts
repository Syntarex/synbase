import "server-only";

import { initAuth0 } from "@auth0/nextjs-auth0/edge";
import { getEnv } from "./env";

/**
 * Konfigurierte Instanz des Auth0-SDKs.
 */
export default initAuth0({
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
