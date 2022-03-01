import { ApiResource, IApp } from "../..";
import { RestClient } from "../rest.client";

export class AppClient extends RestClient {
    public async get(): Promise<IApp> {
        return (await this.httpClient.get(ApiResource.App)).data;
    }
}
