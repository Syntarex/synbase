import { IGetImages, ImageConstants } from "@synbase/shared";
import { IsMimeType, IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

const { PATH_LENGTH } = ImageConstants;

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
    @MaxLength(PATH_LENGTH)
    path?: string;
}
