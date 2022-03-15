import { IGetMyPoints, PointsSource } from "@synbase/shared";
import { IsEnum, IsInt, Max, Min } from "class-validator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";
import { Points } from "./points.entity";

export class GetMyPoints implements IGetMyPoints {
    @IsUndefinedable()
    @IsInt()
    @Min(Points.AMOUNT_MAX * -1)
    @Max(Points.AMOUNT_MAX)
    amount?: number;

    @IsUndefinedable()
    @IsEnum(PointsSource)
    source?: PointsSource;
}
