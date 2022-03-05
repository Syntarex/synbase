import { ICreateImage } from "@synbase/shared";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";
import { Image } from "./image.entity";

export class CreateImage implements ICreateImage {
    @IsNullable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(Image.TITLE_LENGTH)
    title: string | null;
}
