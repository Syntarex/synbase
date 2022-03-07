import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { ensure } from "@synbase/shared";
import ImageKit from "imagekit";
import { UploadOptions } from "imagekit/dist/libs/interfaces";
import _ from "lodash";
import { Repository } from "typeorm";
import { IUploadParams } from "../profile/model/upload.params";
import { TypeOrmService } from "../util/service/typeorm.service";
import { Image } from "./model/image.entity";

/* TODO: Sollte sich die Zugangsdaten per Modul Konfiguration holen */
@Injectable()
export class ImageService extends TypeOrmService<Image> {
    private imageKit: ImageKit;

    constructor(
        configService: ConfigService,
        @InjectRepository(Image) protected readonly repository: Repository<Image>,
    ) {
        super(repository);

        this.imageKit = new ImageKit({
            publicKey: ensure(configService.get("IMAGEKIT_PUBLIC_KEY")),
            privateKey: ensure(configService.get("IMAGEKIT_PRIVATE_KEY")),
            urlEndpoint: ensure(configService.get("IMAGEKIT_URL")),
        });
    }

    public async upload({ id, file, fileName, folder, uploaderId }: IUploadParams): Promise<Image | null> {
        const uploadOptions: UploadOptions = {
            file: file.buffer,
            fileName,
            folder,
            overwriteFile: true,
            useUniqueFileName: false,
        };

        if (!_.isNull(id) && !(await this.exists(id))) {
            return null;
        }

        const response = await this.imageKit.upload(uploadOptions);

        const imageData: Partial<Image> = {
            fileName,
            fileSize: response.size,
            folder,
            mimeType: file.mimetype,
            uploaderId,
        };

        if (!_.isNull(id)) {
            return await this.update(id, imageData);
        }

        return await this.create(imageData);
    }
}
