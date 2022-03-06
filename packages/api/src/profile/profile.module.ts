import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "./model/profile.entity";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
    controllers: [ProfileController],
    imports: [ConfigModule, TypeOrmModule.forFeature([Profile])],
    providers: [ProfileService],
})
export class ProfileModule {}
