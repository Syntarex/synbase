import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DiscordCommandService } from "./discord-command.service";

@Module({
    imports: [ConfigModule],
    providers: [DiscordCommandService],
})
export class DiscordCommandModule {
    constructor(private discordCommandService: DiscordCommandService) {}

    async onModuleInit(): Promise<void> {
        await this.discordCommandService.ensureCommands();
    }
}
