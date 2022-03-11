import { IGetImage } from "@synbase/shared";
import { IsNumber, Max, Min } from "class-validator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

export class GetImage implements IGetImage {
    @IsUndefinedable()
    @Min(1)
    @Max(5000)
    @IsNumber({
        maxDecimalPlaces: 0,
    })
    height?: number;

    @IsUndefinedable()
    @Min(1)
    @Max(100)
    @IsNumber({
        maxDecimalPlaces: 0,
    })
    quality?: number;

    @IsUndefinedable()
    @Min(1)
    @Max(5000)
    @IsNumber({
        maxDecimalPlaces: 0,
    })
    width?: number;
}
