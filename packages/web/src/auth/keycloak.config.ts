import { Env } from "../constants";

export const keycloakConfig = {
    realm: Env.keycloakRealm,
    url: Env.keycloakUrl,
    clientId: Env.keycloakClientId,
};
