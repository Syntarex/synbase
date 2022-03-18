import { IUpdateProfile, ProfileConstants } from "@synbase/shared";
import { IsString, MaxLength, MinLength } from "class-validator";
import { IsSlug } from "../../util/validation/is-slug.decorator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

const { NICKNAME_MAX_LENGTH, NICKNAME_MIN_LENGTH, SLUG_MAX_LENGTH, SLUG_MIN_LENGTH } = ProfileConstants;

export class UpdateProfile implements IUpdateProfile {
    @IsUndefinedable()
    @IsString()
    @MinLength(NICKNAME_MIN_LENGTH)
    @MaxLength(NICKNAME_MAX_LENGTH)
    nickname?: string;

    @IsUndefinedable()
    @IsSlug()
    @MinLength(SLUG_MIN_LENGTH)
    @MaxLength(SLUG_MAX_LENGTH)
    slug?: string;
}
