import _ from "lodash";
import { ApiResource } from "../..";
import { IGetImage, IGetImages, IImage } from "../../model";
import { RestClient } from "../rest.client";

export class ImageClient extends RestClient {
    public async getAll(query: IGetImages = {}): Promise<IImage[]> {
        return (
            await this.httpClient.get(ApiResource.Image, {
                params: query,
            })
        ).data;
    }

    public async get(id: string): Promise<IImage | null> {
        return (await this.httpClient.get(`${ApiResource.Image}/${id}`)).data;
    }

    public getImageUrl(id: string, query: IGetImage = {}): string {
        const params = new URLSearchParams(_.toPairs(query));

        return `${this.httpClient.defaults.baseURL}/${ApiResource.Image}/${id}/image?${params.toString()}`;
    }
}
