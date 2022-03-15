import { IGetPoints, PointsSource } from "@synbase/shared";
import { IsEnum, IsInt, IsUUID, Max, Min } from "class-validator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";
import { Points } from "./points.entity";

export class GetPoints implements IGetPoints {
    @IsUndefinedable()
    @IsInt()
    @Min(Points.AMOUNT_MAX * -1)
    @Max(Points.AMOUNT_MAX)
    amount?: number;

    @IsUndefinedable()
    @IsUUID()
    profileId?: string;

    @IsUndefinedable()
    @IsEnum(PointsSource)
    source?: PointsSource;
}
