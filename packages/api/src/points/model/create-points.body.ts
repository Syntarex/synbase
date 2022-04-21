import { ICreatePoints, PointsConstants, PointsSource } from "@synbase/shared";
import { IsEnum, IsInt, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";

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

    @IsString()
    @MaxLength(NOTES_LENGTH)
    notes: string;
}
