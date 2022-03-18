import { ICreateProfile, ProfileConstants } from "@synbase/shared";
import { IsString, MaxLength, MinLength } from "class-validator";
import { IsSlug } from "../../util/validation/is-slug.decorator";

const { NICKNAME_MAX_LENGTH, NICKNAME_MIN_LENGTH, SLUG_MAX_LENGTH, SLUG_MIN_LENGTH } = ProfileConstants;

export class CreateProfile implements ICreateProfile {
    @IsString()
    @MinLength(NICKNAME_MIN_LENGTH)
    @MaxLength(NICKNAME_MAX_LENGTH)
    nickname: string;

    @IsSlug()
    @MinLength(SLUG_MIN_LENGTH)
    @MaxLength(SLUG_MAX_LENGTH)
    slug: string;
}
