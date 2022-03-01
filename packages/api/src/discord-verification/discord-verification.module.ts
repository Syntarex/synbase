import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscordVerificationController } from "./discord-verification.controller";
import { DiscordVerificationService } from "./discord-verification.service";
import { DiscordVerification } from "./model/discord-verification.entity";

@Module({
    controllers: [DiscordVerificationController],
    imports: [ConfigModule, TypeOrmModule.forFeature([DiscordVerification])],
    providers: [DiscordVerificationService],
})
export class DiscordVerificationModule {}
