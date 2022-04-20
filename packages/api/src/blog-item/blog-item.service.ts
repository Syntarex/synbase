import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeOrmService } from "../util/service/typeorm.service";
import { BlogItem } from "./model/blog-item.entity";

@Injectable()
export class BlogItemService extends TypeOrmService<BlogItem> {
    constructor(@InjectRepository(BlogItem) protected readonly repository: Repository<BlogItem>) {
        super(repository);
    }
}
