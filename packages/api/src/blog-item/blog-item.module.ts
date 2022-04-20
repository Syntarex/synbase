import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageModule } from "../image/image.module";
import { BlogItemController } from "./blog-item.controller";
import { BlogItemService } from "./blog-item.service";
import { BlogItem } from "./model/blog-item.entity";

@Module({
    controllers: [BlogItemController],
    imports: [ConfigModule, ImageModule, TypeOrmModule.forFeature([BlogItem])],
    providers: [BlogItemService],
})
export class BlogItemModule {}
