export { ICreateProfile } from "./create-profile.model";
export { IGetProfiles } from "./get-profiles.model";
export { IProfile } from "./profile.model";
export { IUpdateProfile } from "./update-profile.model";

export const ProfileConstants = {
    NICKNAME_MIN_LENGTH: 3,
    NICKNAME_MAX_LENGTH: 64,
    SLUG_MIN_LENGTH: 3,
    SLUG_MAX_LENGTH: 32,
    SLUG_REGEX: new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$"),
};
