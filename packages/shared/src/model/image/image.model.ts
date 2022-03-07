import { IResource } from "../resource/resource.model";

export interface IImage extends IResource {
    folder: string;
    fileName: string;
    uploaderId: string;
    fileSize: number;
    mimeType: string;
}
