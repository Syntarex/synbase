import { IProfile, ProfileConstants } from "@synbase/shared";
import { Column, Entity, ManyToOne } from "typeorm";
import { Image } from "../../image/model/image.entity";
import { Resource } from "../../util/model/resource.entity";

const { NICKNAME_MAX_LENGTH, SLUG_MAX_LENGTH } = ProfileConstants;

@Entity()
export class Profile extends Resource implements IProfile {
    @Column({ type: "varchar", length: NICKNAME_MAX_LENGTH, unique: true })
    nickname: string;

    @Column({ type: "varchar", length: SLUG_MAX_LENGTH, unique: true })
    slug: string;

    @ManyToOne(() => Image, { nullable: true })
    image: Promise<Image | null>;

    @Column({ nullable: true })
    imageId: string | null;
}
