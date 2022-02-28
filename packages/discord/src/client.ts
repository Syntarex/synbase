import { Synbase } from "@synbase/shared";
import _ from "lodash";
import { Issuer } from "openid-client";
import { Env } from "./constants";
import { IClientCredentialsOptions } from "./model/client-credentials.model";

const { apiUrl, keycloakClientId, keycloakClientSecret, keycloakRealm, keycloakUrl, keycloakTokenRefreshInterval } =
    Env;

const clientCredentials: IClientCredentialsOptions = {
    keycloakClientId,
    keycloakClientSecret,
    keycloakRealm,
    keycloakUrl,
};

export const synbase = new Synbase(apiUrl);

export const getToken = async (options: IClientCredentialsOptions) => {
    const { keycloakClientId, keycloakClientSecret, keycloakRealm, keycloakUrl } = options;

    const keycloakIssuer = await Issuer.discover(`${keycloakUrl}/realms/${keycloakRealm}`);

    const client = new keycloakIssuer.Client({
        token_endpoint_auth_method: "client_secret_post",
        client_id: keycloakClientId,
        client_secret: keycloakClientSecret,
    });

    const { access_token } = await client.grant({
        grant_type: "client_credentials",
    });

    if (_.isUndefined(access_token)) {
        /* TODO: Was hier tun? */
        throw new Error("Kein Access-Token erhalten.");
    }

    return access_token;
};

/* TODO: Error Handling */
export const init = async () => {
    let token = await getToken(clientCredentials);

    synbase.login(token);

    setInterval(async () => {
        token = await getToken(clientCredentials);
        synbase.login(token);
    }, keycloakTokenRefreshInterval);
};
