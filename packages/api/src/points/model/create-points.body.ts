import { ICreatePoints, PointsSource } from "@synbase/shared";
import { IsEnum, IsInt, IsNotEmpty, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";
import { Points } from "./points.entity";

export class CreatePoints implements ICreatePoints {
    @IsInt()
    @Min(Points.AMOUNT_MAX * -1)
    @Max(Points.AMOUNT_MAX)
    amount: number;

    @IsUUID()
    profileId: string;

    @IsEnum(PointsSource)
    source: PointsSource;

    @IsNullable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(Points.NOTES_LENGTH)
    notes: string | null;
}
