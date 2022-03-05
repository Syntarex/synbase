import { IUpdateImage } from "@synbase/shared";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";
import { Image } from "./image.entity";

export class UpdateImage implements IUpdateImage {
    @IsUndefinedable()
    @IsNullable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(Image.TITLE_LENGTH)
    title?: string | null;
}
