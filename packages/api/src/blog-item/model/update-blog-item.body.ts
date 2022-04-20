import { BlogItemConstants, BlogItemFormat, IUpdateBlogItem } from "@synbase/shared";
import { IsBoolean, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";
import { IsSlug } from "../../util/validation/is-slug.decorator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

const { SUMMARY_LENGTH, TITLE_LENGTH, SLUG_MAX_LENGTH, SLUG_MIN_LENGTH } = BlogItemConstants;

export class UpdateBlogItem implements IUpdateBlogItem {
    @IsUndefinedable()
    @IsString()
    @IsNotEmpty()
    content?: string;

    @IsUndefinedable()
    @IsBoolean()
    isDraft?: boolean;

    @IsUndefinedable()
    @IsNullable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(SUMMARY_LENGTH)
    summary?: string | null;

    @IsUndefinedable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(TITLE_LENGTH)
    title?: string;

    @IsUndefinedable()
    @IsSlug()
    @MinLength(SLUG_MIN_LENGTH)
    @MaxLength(SLUG_MAX_LENGTH)
    slug?: string;

    @IsUndefinedable()
    @IsEnum(BlogItemFormat)
    format?: BlogItemFormat;
}
