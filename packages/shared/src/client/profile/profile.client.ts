import _ from "lodash";
import { ApiResource } from "../..";
import { ICreateProfile, IGetImage, IGetProfiles, IImage, IProfile, IUpdateProfile } from "../../model";
import { RestClient } from "../rest.client";

export class ProfileClient extends RestClient {
    public async getAll(query: IGetProfiles): Promise<IProfile[]> {
        return (
            await this.httpClient.get(ApiResource.Profile, {
                params: query,
            })
        ).data;
    }

    public async getBySlug(slug: string): Promise<IProfile | null> {
        const profiles = await this.getAll({ slug });

        if (_.isEmpty(profiles)) {
            return null;
        }

        return profiles[0];
    }

    public async getMy(): Promise<IProfile | null> {
        return (await this.httpClient.get(`${ApiResource.Profile}/my`)).data;
    }

    public async get(id: string): Promise<IProfile | null> {
        return (await this.httpClient.get(`${ApiResource.Profile}/${id}`)).data;
    }

    public async createMy(body: ICreateProfile): Promise<IProfile> {
        return (await this.httpClient.post(`${ApiResource.Profile}/my`, body)).data;
    }

    public async updateMy(body: IUpdateProfile): Promise<IProfile | null> {
        return (await this.httpClient.put(`${ApiResource.Profile}/my`, body)).data;
    }

    public async update(id: string, body: IUpdateProfile): Promise<IProfile | null> {
        return (await this.httpClient.put(`${ApiResource.Profile}/${id}`, body)).data;
    }

    public async deleteMy(): Promise<boolean> {
        await this.httpClient.delete(`${ApiResource.Profile}/my`);

        return true;
    }

    public async delete(id: string): Promise<boolean> {
        await this.httpClient.delete(`${ApiResource.Profile}/${id}`);

        return true;
    }

    public async getMyImage(query: IGetImage = {}): Promise<string | null> {
        const response = await this.httpClient.get(`${ApiResource.Profile}/my/image`, {
            responseType: "arraybuffer",
            params: query,
        });

        if (_.isNull(response.data)) {
            return null;
        }

        const base64 = Buffer.from(response.data, "binary").toString("base64");

        let dataType = "png";

        switch (base64.charAt(0)) {
            case "/":
                dataType = "jpg";
                break;
            case "i":
                dataType = "png";
                break;
            case "R":
                dataType = "gif";
                break;
            case "U":
                dataType = "webp";
                break;
        }

        return `data:image/${dataType};base64,${base64}`;
    }

    public getImage(id: string, query: IGetImage = {}): string {
        const params = new URLSearchParams(_.toPairs(query));

        /* TODO: Testen! */
        console.log(params.toString());

        return `${this.httpClient.defaults.baseURL}/${ApiResource.Profile}/${id}/image`;
    }

    public async uploadMyImage(file: File): Promise<IImage> {
        return await this.upload(`${ApiResource.Profile}/my/image`, file);
    }

    public async uploadImage(id: string, file: File): Promise<IImage> {
        return await this.upload(`${ApiResource.Profile}/${id}/image`, file);
    }
}
