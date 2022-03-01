import axios, { AxiosInstance } from "axios";
import _ from "lodash";
import { AppClient } from "./app/app.client";
import { DiscordVerificationClient } from "./discord-verification/discord-verification.client";

export class Synbase {
    private httpClient: AxiosInstance;

    public app: AppClient;
    public discordVerifications: DiscordVerificationClient;

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
        this.discordVerifications = new DiscordVerificationClient(this.httpClient);
    }

    public login(token: string): void {
        this.httpClient.defaults.withCredentials = true;
        this.httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    public logout(): void {
        this.httpClient.defaults.withCredentials = false;
        delete this.httpClient.defaults.headers.common.Authorization;
    }
}
