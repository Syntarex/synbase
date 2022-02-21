import { IProfile } from "./profile.model";

export type IUpdateProfile = Partial<Pick<IProfile, "nickname">>;
