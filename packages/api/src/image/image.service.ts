import { HttpService } from "@nestjs/axios";
import { Injectable, StreamableFile } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { ensure, IImage } from "@synbase/shared";
import * as fs from "fs-extra";
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
        private readonly httpService: HttpService,
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
            useUniqueFileName: true,
        };

        const image = _.isNull(id) ? null : await this.get(id);

        if (!_.isNull(id) && _.isNull(image)) {
            return null;
        }

        const response = await this.imageKit.upload(uploadOptions);

        const imageData: Partial<Image> = {
            path: response.filePath,
            fileSize: response.size,
            mimeType: file.mimetype,
            uploaderId,
            imageKitId: response.fileId,
        };

        if (!_.isNull(image)) {
            await this.imageKit.deleteFile(image.imageKitId);
            await fs.rm(`temp${image.path}`, {
                force: true,
            });

            return await this.update(image.id, imageData);
        }

        return await this.create(imageData);
    }

    public async download(image: IImage): Promise<StreamableFile> {
        const response = await this.httpService.axiosRef({
            url: this.getUrl(image),
            method: "GET",
            responseType: "arraybuffer",
        });

        await fs.outputFile(`temp${image.path}`, response.data);

        const file = await fs.readFile(`temp${image.path}`);

        return new StreamableFile(file);
    }

    /* TODO: Use transformations */
    private getUrl(image: IImage): string {
        return this.imageKit.url({
            signed: true,
            path: image.path,
        });
    }
}
