import { IImage, ImageConstants } from "@synbase/shared";
import { Column, Entity, ManyToOne } from "typeorm";
import { Length } from "../../constants";
import { Profile } from "../../profile/model/profile.entity";
import { Resource } from "../../util/model/resource.entity";

const { PATH_LENGTH } = ImageConstants;

@Entity()
export class Image extends Resource implements IImage {
    @Column({ type: "varchar", length: PATH_LENGTH })
    path: string;

    @ManyToOne(() => Profile)
    uploader: Promise<Profile>;

    @Column()
    uploaderId: string;

    @Column({ type: "integer" })
    fileSize: number;

    @Column({ type: "varchar", length: Length.MIMETYPE })
    mimeType: string;

    @Column({ type: "varchar" })
    imageKitId: string;
}
