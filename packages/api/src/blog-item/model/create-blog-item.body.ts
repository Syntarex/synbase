import { BlogItemConstants, BlogItemFormat, ICreateBlogItem } from "@synbase/shared";
import { IsBoolean, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";
import { IsSlug } from "../../util/validation/is-slug.decorator";

const { SUMMARY_LENGTH, TITLE_LENGTH, SLUG_MAX_LENGTH, SLUG_MIN_LENGTH } = BlogItemConstants;

export class CreateBlogItem implements ICreateBlogItem {
    @IsNullable()
    @IsString()
    @IsNotEmpty()
    content: string | null;

    @IsBoolean()
    isDraft: boolean;

    @IsNullable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(SUMMARY_LENGTH)
    summary: string | null;

    @IsString()
    @IsNotEmpty()
    @MaxLength(TITLE_LENGTH)
    title: string;

    @IsSlug()
    @MinLength(SLUG_MIN_LENGTH)
    @MaxLength(SLUG_MAX_LENGTH)
    slug: string;

    @IsEnum(BlogItemFormat)
    format: BlogItemFormat;
}
