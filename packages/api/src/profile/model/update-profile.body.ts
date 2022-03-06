import { IUpdateProfile } from "@synbase/shared";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";
import { Profile } from "./profile.entity";

export class UpdateProfile implements IUpdateProfile {
    @IsUndefinedable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(Profile.NICKNAME_LENGTH)
    nickname?: string;
}
