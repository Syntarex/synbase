import { IResource } from "..";

export interface IProfile extends IResource {
    discordUserId: string | null;
    points: number;
}
