import { Synbase } from "@synbase/shared";
import _ from "lodash";
import { Issuer } from "openid-client";
import { Config, Env } from "./constants";

export const synbase = new Synbase(Env.apiUrl);

const issuerUrl = `${Env.keycloakUrl}/realms/${Env.keycloakRealm}`;

const getToken = async () => {
    const keycloakIssuer = await Issuer.discover(issuerUrl);

    const client = new keycloakIssuer.Client({
        token_endpoint_auth_method: "client_secret_post",
        client_id: Env.keycloakClientId,
        client_secret: Env.keycloakClientSecret,
    });

    return await client.grant({
        grant_type: "client_credentials",
    });
};

export const init = async () => {
    const authenticate = async () => {
        const { access_token } = await getToken();

        if (_.isUndefined(access_token)) {
            synbase.logout();
            /* TODO: Hier muss mehr passieren */
            throw new Error("Es ist ein Fehler beim Authentifizieren aufgetreten.");
        }

        synbase.login(access_token);
    };

    await authenticate();

    setInterval(authenticate, Config.tokenRefreshInterval);
};
