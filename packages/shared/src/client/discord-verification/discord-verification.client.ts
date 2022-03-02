import {
    ApiResource,
    ICreateDiscordVerification,
    IDiscordVerification,
    IGetDiscordVerification,
    IUpdateDiscordVerification,
} from "../..";
import { RestClient } from "../rest.client";

const { DiscordVerification: url } = ApiResource;

export class DiscordVerificationClient extends RestClient {
    public async create(id: string, body: ICreateDiscordVerification): Promise<IDiscordVerification> {
        return (await this.httpClient.post(`${url}/${id}`, body)).data;
    }

    public async createMy(body: ICreateDiscordVerification): Promise<IDiscordVerification> {
        return (await this.httpClient.post(`${url}/my`, body)).data;
    }

    public async getAll(query: IGetDiscordVerification): Promise<IDiscordVerification[]> {
        return (
            await this.httpClient.get(url, {
                params: query,
            })
        ).data;
    }

    public async get(id: string): Promise<IDiscordVerification> {
        return (await this.httpClient.get(`${url}/${id}`)).data;
    }

    public async getMy(): Promise<IDiscordVerification> {
        return (await this.httpClient.get(`${url}/my`)).data;
    }

    public async update(id: string, body: IUpdateDiscordVerification): Promise<IDiscordVerification> {
        return (await this.httpClient.put(`${url}/${id}`, body)).data;
    }

    public async updateMy(body: IUpdateDiscordVerification): Promise<IDiscordVerification> {
        return (await this.httpClient.put(`${url}/my`, body)).data;
    }
}
