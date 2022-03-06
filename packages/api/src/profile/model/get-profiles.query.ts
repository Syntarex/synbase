import { IGetProfiles } from "@synbase/shared";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsSlug } from "../../util/validation/is-slug.decorator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";
import { Profile } from "./profile.entity";

export class GetProfiles implements IGetProfiles {
    @IsUndefinedable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(Profile.NICKNAME_LENGTH)
    nickname?: string;

    @IsUndefinedable()
    @IsSlug()
    @MinLength(Profile.SLUG_MIN_LENGTH)
    @MaxLength(Profile.SLUG_MAX_LENGTH)
    slug?: string;
}
