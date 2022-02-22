import { DiscordCommand } from "@synbase/shared";
import { Client, Intents } from "discord.js";
import { init, synbase } from "./client";
import { Env } from "./constants";

const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", async () => {
    await init();
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command: DiscordCommand = interaction.commandName as DiscordCommand;

    switch (command) {
        case DiscordCommand.Ping:
            await interaction.reply("Pong!");
        case DiscordCommand.Info:
            const app = await synbase.app.get();
            await interaction.reply(`Ich habe Version v${app.version}`);
    }
});

client.login(Env.token);
