import axios, { AxiosInstance } from "axios";
import _ from "lodash";
import { Issuer } from "openid-client";
import { AppClient } from "./app/app.client";

export interface IClientCredentialsOptions {
    keycloakUrl: string;
    keycloakRealm: string;
    keycloakClientId: string;
    keycloakClientSecret: string;
}

export class Synbase {
    private httpClient: AxiosInstance;

    public app: AppClient;

    constructor(baseUrl: string) {
        this.httpClient = axios.create({
            baseURL: baseUrl,
            responseType: "json",
        });

        this.httpClient.interceptors.response.use(
            (response) => response,
            (error) => {
                const message = error.response?.data?.message;

                if (!_.isUndefined(message)) {
                    if (_.isString(message)) {
                        throw new Error(message);
                    }

                    if (_.isArray(message)) {
                        throw new Error(message.join("\n"));
                    }

                    throw new Error(_.toString(message));
                }

                throw error;
            },
        );

        this.app = new AppClient(this.httpClient);
    }

    public login(token: string): void {
        this.httpClient.defaults.withCredentials = true;
        this.httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    public logout(): void {
        this.httpClient.defaults.withCredentials = false;
        delete this.httpClient.defaults.headers.common.Authorization;
    }

    public async loginAsClient(options: IClientCredentialsOptions): Promise<void> {
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

        console.log("Versuche einzuloggen", access_token);

        if (_.isUndefined(access_token)) {
            this.logout();

            /* TODO: Was hier tun? */
            throw new Error("Kein Access-Token erhalten.");
        }

        this.login(access_token);
    }
}
