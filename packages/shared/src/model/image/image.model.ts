import { IResource } from "..";

export interface IImage extends IResource {
    path: string;
    uploaderId: string;
    fileSize: number;
    mimeType: string;
    imageKitId: string;
}
