import { IDiscordVerification } from ".";

export type ICreateDiscordVerification = Pick<IDiscordVerification, "id" | "discordUserId" | "verificationCode">;
