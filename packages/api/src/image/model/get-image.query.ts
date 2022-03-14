import { IGetImage } from "@synbase/shared";
import { IsPositive, Max } from "class-validator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

export class GetImage implements IGetImage {
    @IsUndefinedable()
    @IsPositive()
    @Max(5000)
    height?: number;

    @IsUndefinedable()
    @IsPositive()
    @Max(100)
    quality?: number;

    @IsUndefinedable()
    @IsPositive()
    @Max(5000)
    width?: number;
}
