import { IGetPoints, PointsConstants, PointsSource } from "@synbase/shared";
import { IsEnum, IsInt, IsUUID, Max, Min } from "class-validator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

const { AMOUNT_MAX } = PointsConstants;

export class GetPoints implements IGetPoints {
    @IsUndefinedable()
    @IsInt()
    @Min(AMOUNT_MAX * -1)
    @Max(AMOUNT_MAX)
    amount?: number;

    @IsUndefinedable()
    @IsUUID()
    profileId?: string;

    @IsUndefinedable()
    @IsEnum(PointsSource)
    source?: PointsSource;
}
