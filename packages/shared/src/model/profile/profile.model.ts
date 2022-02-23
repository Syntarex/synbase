import { IResource } from "..";

export interface IProfile extends IResource {
    nickname: string;
    points: number;
}
