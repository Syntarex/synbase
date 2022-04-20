import { BlogItemConstants, BlogItemFormat, IGetBlogItems } from "@synbase/shared";
import { IsBoolean, IsEnum, MaxLength, MinLength } from "class-validator";
import { IsSlug } from "../../util/validation/is-slug.decorator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

const { SLUG_MAX_LENGTH, SLUG_MIN_LENGTH } = BlogItemConstants;

export class GetBlogItems implements IGetBlogItems {
    @IsUndefinedable()
    @IsBoolean()
    isDraft?: boolean;

    @IsUndefinedable()
    @IsSlug()
    @MinLength(SLUG_MIN_LENGTH)
    @MaxLength(SLUG_MAX_LENGTH)
    slug?: string;

    @IsUndefinedable()
    @IsEnum(BlogItemFormat)
    format?: BlogItemFormat;
}
