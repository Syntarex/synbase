import { IGetImages } from "@synbase/shared";
import { IsMimeType, IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";
import { Image } from "./image.entity";

export class GetImages implements IGetImages {
    @IsUndefinedable()
    @IsUUID()
    id?: string;

    @IsUndefinedable()
    @IsMimeType()
    mimeType?: string;

    @IsUndefinedable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(Image.PATH_LENGTH)
    path?: string;
}
