import { IResource } from "../resource/resource.model";

export enum BlogItemFormat {
    MARKDOWN = 0,
}

export interface IBlogItem extends IResource {
    title: string;
    summary: string | null;
    authorId: string;
    content: string;
    isDraft: boolean;
    slug: string;
    format: BlogItemFormat;
}
