import { IDiscordVerification } from ".";

export type ICreateDiscordVerification = Pick<IDiscordVerification, "discordUserId" | "verificationCode">;
