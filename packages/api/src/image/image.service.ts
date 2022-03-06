import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ensure } from "@synbase/shared";
import ImageKit from "imagekit";

/* TODO: Sollte sich die Zugangsdaten per Modul Konfiguration holen */
@Injectable()
export class ImageService {
    private imageKit: ImageKit;

    constructor(configService: ConfigService) {
        this.imageKit = new ImageKit({
            publicKey: ensure(configService.get("IMAGEKIT_PUBLIC_KEY")),
            privateKey: ensure(configService.get("IMAGEKIT_PRIVATE_KEY")),
            urlEndpoint: ensure(configService.get("IMAGEKIT_URL")),
        });
    }

    public async upload(file: Express.Multer.File, folder = "common", fileName: string): Promise<void> {
        const response = await this.imageKit.upload({
            file: file.buffer,
            fileName,
            folder,
            overwriteFile: true,
            useUniqueFileName: false,
        });

        Logger.log(response, "ImageService");
    }
}
