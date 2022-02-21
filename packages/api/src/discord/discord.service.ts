import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DiscordCommand, ensure } from "@synbase/shared";
import { Routes } from "discord-api-types/v9";

@Injectable()
export class DiscordService {
    public static COMMANDS: SlashCommandBuilder[] = [
        new SlashCommandBuilder().setName(DiscordCommand.Ping).setDescription("Antwortet mit Pong!"),
    ];

    private token: string;
    private clientId: string;
    private guildId: string;
    private rest: REST;

    constructor(private configService: ConfigService) {
        this.token = ensure(configService.get("DISCORD_BOT_TOKEN"));
        this.clientId = ensure(this.configService.get("DISCORD_CLIENT_ID"));
        this.guildId = ensure(this.configService.get("DISCORD_GUILD_ID"));

        this.rest = new REST();
        this.rest.setToken(this.token);
    }

    public async ensureCommands(): Promise<void> {
        const commandsAsJson = DiscordService.COMMANDS.map((command) => command.toJSON());

        /* TODO: Auf globalGuildCommands umstellen wenn produktiv */
        await this.rest.put(Routes.applicationGuildCommands(this.clientId, this.guildId), { body: commandsAsJson });
    }
}
