import { IResource } from "../resource/resource.model";

export interface IImage extends IResource {
    path: string;
    uploaderId: string;
    fileSize: number;
    mimeType: string;
    imageKitId: string;
}
