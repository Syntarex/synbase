import { IDiscordVerification } from ".";

export type ICreateDiscordVerification = Pick<IDiscordVerification, "profileId" | "discordUserId" | "verificationCode">;
