import { IProfile } from "./profile.model";

export type ICreateProfile = Pick<IProfile, "discordUserId" | "points">;
