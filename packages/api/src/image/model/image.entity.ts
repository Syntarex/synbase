import { IImage } from "@synbase/shared";
import { Column, Entity, ManyToOne } from "typeorm";
import { Length } from "../../constants";
import { Profile } from "../../profile/model/profile.entity";
import { Resource } from "../../util/model/resource.entity";

@Entity()
export class Image extends Resource implements IImage {
    public static PATH_LENGTH = 128;
    public static FOLDER_LENGTH = 32;

    @Column({ type: "varchar", length: Image.PATH_LENGTH })
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
