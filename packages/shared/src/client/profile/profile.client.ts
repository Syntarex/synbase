import _ from "lodash";
import { ApiResource } from "../..";
import { ICreateProfile, IGetProfiles, IImage, IProfile, IUpdateProfile } from "../../model";
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

    public async uploadMyImage(file: File): Promise<IImage> {
        return await this.upload(`${ApiResource.Profile}/my/image`, file);
    }
}
