import _ from "lodash";
import { ApiResource } from "../..";
import { IBlogItem, ICreateBlogItem, IGetBlogItems, IImage, IUpdateBlogItem } from "../../model";
import { RestClient } from "../rest.client";

export class BlogItemClient extends RestClient {
    public async getAll(query: IGetBlogItems = {}): Promise<IBlogItem[]> {
        return (
            await this.httpClient.get(ApiResource.BlogItem, {
                params: query,
            })
        ).data;
    }

    public async getBySlug(slug: string): Promise<IBlogItem | null> {
        const blogItems = await this.getAll({ slug });

        if (_.isEmpty(blogItems)) {
            return null;
        }

        return blogItems[0];
    }

    public async get(id: string): Promise<IBlogItem | null> {
        return (await this.httpClient.get(`${ApiResource.BlogItem}/${id}`)).data;
    }

    public async create(body: ICreateBlogItem): Promise<IBlogItem> {
        return (await this.httpClient.post(ApiResource.BlogItem, body)).data;
    }

    public async update(id: string, body: IUpdateBlogItem): Promise<IBlogItem | null> {
        return (await this.httpClient.put(`${ApiResource.BlogItem}/${id}`, body)).data;
    }

    public async delete(id: string): Promise<boolean> {
        await this.httpClient.delete(`${ApiResource.BlogItem}/${id}`);

        return true;
    }

    public async uploadImage(id: string, file: File): Promise<IImage> {
        return await this.upload(`${ApiResource.BlogItem}/${id}/image`, file);
    }
}
