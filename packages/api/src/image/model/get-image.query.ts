import { IGetImage } from "@synbase/shared";
import { Transform } from "class-transformer";
import { IsInt, IsPositive, Max } from "class-validator";
import _ from "lodash";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

/* TODO: Transform Decorator verhübschen */
export class GetImage implements IGetImage {
    @IsUndefinedable()
    @IsInt()
    @IsPositive()
    @Max(5000)
    @Transform(({ value }) => (_.isUndefined(value) ? undefined : _.toNumber(value)))
    height?: number;

    @IsUndefinedable()
    @IsInt()
    @IsPositive()
    @Max(100)
    @Transform(({ value }) => (_.isUndefined(value) ? undefined : _.toNumber(value)))
    quality?: number;

    @IsUndefinedable()
    @IsInt()
    @IsPositive()
    @Max(5000)
    @Transform(({ value }) => (_.isUndefined(value) ? undefined : _.toNumber(value)))
    width?: number;
}
