import { ApiResource } from "../..";
import { ICreatePoints, IGetMyPoints, IGetPoints, IPoints } from "../../model";
import { RestClient } from "../rest.client";

export class PointsClient extends RestClient {
    public async getAll(query: IGetPoints = {}): Promise<IPoints[]> {
        return (
            await this.httpClient.get(ApiResource.Points, {
                params: query,
            })
        ).data;
    }

    public async getAllMy(query: IGetMyPoints = {}): Promise<IPoints[]> {
        return (
            await this.httpClient.get(`${ApiResource.Points}/my`, {
                params: query,
            })
        ).data;
    }

    public async getMy(id: string): Promise<IPoints | null> {
        return (await this.httpClient.get(`${ApiResource.Points}/my/${id}`)).data;
    }

    public async get(id: string): Promise<IPoints | null> {
        return (await this.httpClient.get(`${ApiResource.Points}/${id}`)).data;
    }

    public async create(body: ICreatePoints): Promise<IPoints> {
        return (await this.httpClient.post(ApiResource.Points, body)).data;
    }

    public async delete(id: string): Promise<boolean> {
        await this.httpClient.delete(`${ApiResource.Points}/${id}`);

        return true;
    }
}
