import { IProfile } from "@synbase/shared";
import { Column, Entity } from "typeorm";
import { Resource } from "../../util/model/resource.entity";

@Entity()
export class Profile extends Resource implements IProfile {
    public static NICKNAME_LENGTH = 64;
    public static SLUG_MIN_LENGTH = 3;
    public static SLUG_MAX_LENGTH = 32;

    @Column({ type: "varchar", length: Profile.NICKNAME_LENGTH, unique: true })
    nickname: string;

    @Column({ type: "varchar", length: Profile.SLUG_MAX_LENGTH, unique: true })
    slug: string;
}
