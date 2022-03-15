import { ICreatePoints, PointsSource } from "@synbase/shared";
import { IsEnum, IsInt, IsUUID, Max, Min } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";
import { Points } from "./points.entity";

export class CreatePoints implements ICreatePoints {
    @IsInt()
    @Min(Points.AMOUNT_MAX * -1)
    @Max(Points.AMOUNT_MAX)
    amount: number;

    @IsUUID()
    profileId: string;

    @IsNullable()
    @IsUUID()
    senderId: string | null;

    @IsEnum(PointsSource)
    source: PointsSource;
}
