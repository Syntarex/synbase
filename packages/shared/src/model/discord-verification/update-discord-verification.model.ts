import { IDiscordVerification } from ".";

export type IUpdateDiscordVerification = Partial<Pick<IDiscordVerification, "discordUserId" | "verificationCode">>;
