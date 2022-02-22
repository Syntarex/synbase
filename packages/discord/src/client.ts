import { Issuer } from "openid-client";
import { Env } from "./constants";

const issuerUrl = `${Env.keycloakUrl}/realms/${Env.keycloakRealm}`;

export const getToken = async () => {
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
