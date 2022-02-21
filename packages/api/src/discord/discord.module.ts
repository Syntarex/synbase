import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DiscordService } from "./discord.service";

@Module({
    imports: [ConfigModule],
    providers: [DiscordService],
})
export class DiscordModule {
    constructor(private discordService: DiscordService) {}

    async onModuleInit(): Promise<void> {
        await this.discordService.ensureCommands();
    }
}
