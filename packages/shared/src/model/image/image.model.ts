import { IResource } from "../resource/resource.model";

export interface IImage extends IResource {
    title: string | null;
    url: string;
    userId: string;
}
