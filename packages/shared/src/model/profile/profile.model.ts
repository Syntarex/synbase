import { IResource } from "..";

export interface IProfile extends IResource {
    nickname: string;
    discordUserId: string | null;
    discordVerificationCode: string;
    points: number;
}
