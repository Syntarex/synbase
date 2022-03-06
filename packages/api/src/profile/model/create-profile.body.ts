import { ICreateProfile } from "@synbase/shared";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsSlug } from "../../util/validation/is-slug.decorator";
import { Profile } from "./profile.entity";

export class CreateProfile implements ICreateProfile {
    @IsString()
    @IsNotEmpty()
    @MaxLength(Profile.NICKNAME_LENGTH)
    nickname: string;

    @IsSlug()
    @MinLength(Profile.SLUG_MIN_LENGTH)
    @MaxLength(Profile.SLUG_MAX_LENGTH)
    slug: string;
}
