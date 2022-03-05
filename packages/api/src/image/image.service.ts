import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeOrmService } from "../util/service/typeorm.service";
import { Image } from "./model/image.entity";

@Injectable()
export class ImageService extends TypeOrmService<Image> {
    constructor(@InjectRepository(Image) protected readonly repository: Repository<Image>) {
        super(repository);
    }
}
