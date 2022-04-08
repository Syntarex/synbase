import { IGetImage } from "@synbase/shared";
import { IsInt, IsPositive, Max } from "class-validator";
import { TransformTo } from "../../util/transformation/transform-to.decorator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

/* TODO: Transform Decorator verhübschen */
export class GetImage implements IGetImage {
    @IsUndefinedable()
    @IsInt()
    @IsPositive()
    @Max(5000)
    @TransformTo({ type: "number" })
    height?: number;

    @IsUndefinedable()
    @IsInt()
    @IsPositive()
    @Max(100)
    @TransformTo({ type: "number" })
    quality?: number;

    @IsUndefinedable()
    @IsInt()
    @IsPositive()
    @Max(5000)
    @TransformTo({ type: "number" })
    width?: number;
}
