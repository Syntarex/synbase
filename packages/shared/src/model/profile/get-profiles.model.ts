import { IProfile } from "./profile.model";

export type IGetProfiles = Partial<Pick<IProfile, "nickname">>;
