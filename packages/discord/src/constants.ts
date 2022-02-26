import { ensure } from "@synbase/shared";

export const Config = {
    tokenRefreshInterval: 200000 /* ms */,
};

export const Env = {
    token: ensure(process.env.DISCORD_BOT_TOKEN),
    apiUrl: ensure(process.env.API_URL),
    keycloakUrl: ensure(process.env.KEYCLOAK_URL),
    keycloakRealm: ensure(process.env.KEYCLOAK_REALM),
    keycloakClientId: ensure(process.env.KEYCLOAK_CLIENT_ID),
    keycloakClientSecret: ensure(process.env.KEYCLOAK_CLIENT_SECRET),
    keycloakTokenRefreshInterval: Number(ensure(process.env.KEYCLOAK_TOKEN_REFRESH_INTERVAL)),
};
