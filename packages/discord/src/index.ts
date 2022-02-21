import { DiscordCommand } from "@synbase/shared";
import { Client, Intents } from "discord.js";
import { Env } from "./constants";

const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
    console.log("Hello Discord!");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command: DiscordCommand = interaction.commandName as DiscordCommand;

    switch (command) {
        case DiscordCommand.Ping:
            await interaction.reply("Pong!");
    }
});

client.login(Env.token);
