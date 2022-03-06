import { Request } from "express";

export const imageFileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
) => {
    const { mimetype } = file;

    const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];

    if (!allowedFileTypes.includes(mimetype)) {
        callback(new Error("Nur .png, .jpg und .jpeg sind erlaubt."), false);

        return;
    }

    callback(null, true);
};
