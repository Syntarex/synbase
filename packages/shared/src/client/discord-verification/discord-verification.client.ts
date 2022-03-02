import {
    ApiResource,
    ICreateDiscordVerification,
    IDiscordVerification,
    IGetDiscordVerification,
    IUpdateDiscordVerification,
} from "../..";
import { RestClient } from "../rest.client";

export class DiscordVerificationClient extends RestClient {
    public async getAll(query: IGetDiscordVerification): Promise<IDiscordVerification[]> {
        return (
            await this.httpClient.get(ApiResource.DiscordVerification, {
                params: query,
            })
        ).data;
    }

    public async getMy(): Promise<IDiscordVerification> {
        return (await this.httpClient.get(`${ApiResource.DiscordVerification}/my`)).data;
    }

    public async get(id: string): Promise<IDiscordVerification> {
        return (await this.httpClient.get(`${ApiResource.DiscordVerification}/${id}`)).data;
    }

    public async createMy(body: ICreateDiscordVerification): Promise<IDiscordVerification> {
        return (await this.httpClient.post(`${ApiResource.DiscordVerification}/my`, body)).data;
    }

    public async create(id: string, body: ICreateDiscordVerification): Promise<IDiscordVerification> {
        return (await this.httpClient.post(`${ApiResource.DiscordVerification}/${id}`, body)).data;
    }

    public async updateMy(body: IUpdateDiscordVerification): Promise<IDiscordVerification> {
        return (await this.httpClient.put(`${ApiResource.DiscordVerification}/my`, body)).data;
    }

    public async update(id: string, body: IUpdateDiscordVerification): Promise<IDiscordVerification> {
        return (await this.httpClient.put(`${ApiResource.DiscordVerification}/${id}`, body)).data;
    }
}
