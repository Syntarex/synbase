import "server-only";

import { REST } from "@discordjs/rest";
import { getEnv } from "./env";

/**
 * Konfigurierte Instanz von discord.js.
 */
export const discord = new REST({ version: "10" }).setToken(getEnv("DISCORD_TOKEN"));

export { Routes } from "discord-api-types/v10";
