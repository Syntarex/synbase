import { DiscordCommand } from "@synbase/shared";
import { Client, Intents } from "discord.js";
import { init } from "./client";
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
            console.log(interaction);
            await interaction.reply("Pong!");
    }
});

client.login(Env.token);
