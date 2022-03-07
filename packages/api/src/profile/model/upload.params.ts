export interface IUploadParams {
    id: string | null;
    file: Express.Multer.File;
    folder?: string;
    fileName: string;
    uploaderId: string;
}
