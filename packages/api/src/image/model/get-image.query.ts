import { IGetImage } from "@synbase/shared";
import { IsInt, IsPositive, Max } from "class-validator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

export class GetImage implements IGetImage {
    @IsUndefinedable()
    @IsPositive()
    @Max(5000)
    @IsInt()
    height?: number;

    @IsUndefinedable()
    @IsPositive()
    @Max(100)
    @IsInt()
    quality?: number;

    @IsUndefinedable()
    @IsPositive()
    @Max(5000)
    @IsInt()
    width?: number;
}
