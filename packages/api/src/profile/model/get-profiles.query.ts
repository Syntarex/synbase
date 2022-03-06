import { IGetProfiles } from "@synbase/shared";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";
import { Profile } from "./profile.entity";

export class GetProfiles implements IGetProfiles {
    @IsUndefinedable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(Profile.NICKNAME_LENGTH)
    nickname?: string;
}
