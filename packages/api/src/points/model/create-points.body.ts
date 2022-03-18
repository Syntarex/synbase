import { ICreatePoints, PointsConstants, PointsSource } from "@synbase/shared";
import { IsEnum, IsInt, IsNotEmpty, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";

const { NOTES_LENGTH, AMOUNT_MAX } = PointsConstants;

export class CreatePoints implements ICreatePoints {
    @IsInt()
    @Min(AMOUNT_MAX * -1)
    @Max(AMOUNT_MAX)
    amount: number;

    @IsUUID()
    profileId: string;

    @IsEnum(PointsSource)
    source: PointsSource;

    @IsNullable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(NOTES_LENGTH)
    notes: string | null;
}
