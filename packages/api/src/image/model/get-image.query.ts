import { IGetImage } from "@synbase/shared";
import { IsInt, IsPositive, Max } from "class-validator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

/* FIXME: Ist nicht nutzbar, schmeißt immer 400 Bad Request */
export class GetImage implements IGetImage {
    @IsUndefinedable()
    @IsInt()
    @IsPositive()
    @Max(5000)
    height?: number;

    @IsUndefinedable()
    @IsInt()
    @IsPositive()
    @Max(100)
    quality?: number;

    @IsUndefinedable()
    @IsInt()
    @IsPositive()
    @Max(5000)
    width?: number;
}
