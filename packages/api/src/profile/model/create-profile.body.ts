import { ICreateProfile } from "@synbase/shared";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Profile } from "./profile.entity";

export class CreateProfile implements ICreateProfile {
    @IsString()
    @IsNotEmpty()
    @MaxLength(Profile.NICKNAME_LENGTH)
    nickname: string;
}
