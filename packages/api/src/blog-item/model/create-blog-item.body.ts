import { BlogItemConstants, BlogItemFormat, ICreateBlogItem } from "@synbase/shared";
import { IsBoolean, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsSlug } from "../../util/validation/is-slug.decorator";

const { SUMMARY_LENGTH, TITLE_LENGTH, SLUG_MAX_LENGTH, SLUG_MIN_LENGTH } = BlogItemConstants;

export class CreateBlogItem implements ICreateBlogItem {
    @IsString()
    content: string;

    @IsBoolean()
    isDraft: boolean;

    @IsString()
    @MaxLength(SUMMARY_LENGTH)
    summary: string;

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
