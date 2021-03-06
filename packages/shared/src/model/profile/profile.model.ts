import { IResource } from "..";

export interface IProfile extends IResource {
    nickname: string;
    slug: string;
    imageId: string | null;
}
