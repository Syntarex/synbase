import { DiscordCommand } from "@synbase/shared";
import { Client, Intents } from "discord.js";
import { getToken } from "./client";
import { Env } from "./constants";

const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", async () => {
    console.log("Hello Discord!");

    const token = await getToken();

    console.log(token);
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
