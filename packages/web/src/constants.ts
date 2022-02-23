import { ensure } from "@synbase/shared";

export const Env = {
    apiUrl: ensure(process.env.API_URL),
    keycloakUrl: ensure(process.env.KEYCLOAK_URL),
    keycloakClientId: ensure(process.env.KEYCLOAK_CLIENT_ID),
    keycloakRealm: ensure(process.env.KEYCLOAK_REALM),
};
