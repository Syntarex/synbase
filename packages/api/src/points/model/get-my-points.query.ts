import { IGetMyPoints, PointsConstants, PointsSource } from "@synbase/shared";
import { IsEnum, IsInt, Max, Min } from "class-validator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

const { AMOUNT_MAX } = PointsConstants;

export class GetMyPoints implements IGetMyPoints {
    @IsUndefinedable()
    @IsInt()
    @Min(AMOUNT_MAX * -1)
    @Max(AMOUNT_MAX)
    amount?: number;

    @IsUndefinedable()
    @IsEnum(PointsSource)
    source?: PointsSource;
}
