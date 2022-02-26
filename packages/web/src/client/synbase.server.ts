import { IClientCredentialsOptions, Synbase } from "@synbase/shared";
import { ServerEnv } from "../constants/constants.server";

const { apiUrl, keycloakClientId, keycloakClientSecret, keycloakRealm, keycloakUrl, keycloakTokenRefreshInterval } =
    ServerEnv;
const clientCredentials: IClientCredentialsOptions = {
    keycloakClientId,
    keycloakClientSecret,
    keycloakRealm,
    keycloakUrl,
};

export const serverSynbase = new Synbase(apiUrl);

export const init = async () => {
    await serverSynbase.loginAsClient(clientCredentials);

    setInterval(() => serverSynbase.loginAsClient(clientCredentials), keycloakTokenRefreshInterval);
};
