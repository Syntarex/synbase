import { IGetMyPoints, PointsSource } from "@synbase/shared";
import { IsEnum, IsInt, IsUUID, Max, Min } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";
import { Points } from "./points.entity";

export class GetMyPoints implements IGetMyPoints {
    @IsUndefinedable()
    @IsInt()
    @Min(Points.AMOUNT_MAX * -1)
    @Max(Points.AMOUNT_MAX)
    amount?: number;

    @IsUndefinedable()
    @IsNullable()
    @IsUUID()
    senderId?: string | null;

    @IsUndefinedable()
    @IsEnum(PointsSource)
    source?: PointsSource;
}
