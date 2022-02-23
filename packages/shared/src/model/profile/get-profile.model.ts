import { IProfile } from "./profile.model";

export type IGetProfile = Partial<Pick<IProfile, "nickname">>;
