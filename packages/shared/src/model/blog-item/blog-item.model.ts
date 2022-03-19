import { IResource } from "../resource/resource.model";

export interface IBlogItem extends IResource {
    title: string;
    subTitle: string | null;
    authorId: string;
    markdown: string;
    isDraft: boolean;
    slug: string;
}
