import { IGetImage } from "@synbase/shared";
import { IsUrl, IsUUID } from "class-validator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

export class GetImage implements IGetImage {
    @IsUndefinedable()
    @IsUrl()
    url?: string;

    @IsUndefinedable()
    @IsUUID()
    userId?: string;
}
