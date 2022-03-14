import { IGetPoints } from "@synbase/shared";
import { PointsSource } from "@synbase/shared/src/model/points/points.model";
import { IsEnum, IsInt, IsUUID, Max, Min } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";
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
    @IsNullable()
    @IsUUID()
    senderId?: string | null;

    @IsUndefinedable()
    @IsEnum(PointsSource)
    source?: PointsSource;
}
