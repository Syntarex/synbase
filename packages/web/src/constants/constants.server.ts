import { ensure } from "@synbase/shared";

export const ServerEnv = {
    apiUrl: ensure(process.env.API_URL),
    keycloakUrl: ensure(process.env.KEYCLOAK_URL),
    keycloakClientId: ensure(process.env.KEYCLOAK_CLIENT_ID),
    keycloakClientSecret: ensure(process.env.KEYCLOAK_CLIENT_SECRET),
    keycloakRealm: ensure(process.env.KEYCLOAK_REALM),
    keycloakTokenRefreshInterval: Number(ensure(process.env.KEYCLOAK_TOKEN_REFRESH_INTERVAL)),
    webUrl: ensure(process.env.WEB_URL),
};
