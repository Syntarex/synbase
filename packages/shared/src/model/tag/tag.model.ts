import { IResource } from "../resource/resource.model";

export interface ITag extends IResource {
    title: string;
    slug: string;
}
