import { IProfile } from "@synbase/shared";
import { Column, Entity } from "typeorm";
import { Resource } from "../../util/model/resource.entity";

@Entity()
export class Profile extends Resource implements IProfile {
    public static NICKNAME_LENGTH = 64;

    @Column({ type: "varchar", length: Profile.NICKNAME_LENGTH, unique: true })
    nickname: string;
}
