import {
    ApiResource,
    ICreateDiscordVerification,
    IDiscordVerification,
    IGetDiscordVerification,
    IUpdateDiscordVerification,
} from "../..";
import { RestClient } from "../rest.client";

export class DiscordVerificationClient extends RestClient {
    public async create(body: ICreateDiscordVerification): Promise<IDiscordVerification> {
        return (await this.httpClient.post(ApiResource.DiscordVerification, body)).data;
    }

    public async getAll(query: IGetDiscordVerification): Promise<IDiscordVerification[]> {
        return (
            await this.httpClient.get(ApiResource.DiscordVerification, {
                params: query,
            })
        ).data;
    }

    public async get(id: string): Promise<IDiscordVerification> {
        return (await this.httpClient.get(`${ApiResource.DiscordVerification}/${id}`)).data;
    }

    public async update(id: string, body: IUpdateDiscordVerification): Promise<IDiscordVerification> {
        return (await this.httpClient.put(`${ApiResource.DiscordVerification}/${id}`, body)).data;
    }
}
