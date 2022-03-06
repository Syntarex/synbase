import { IImage } from "@synbase/shared";
import { Column, Entity } from "typeorm";
import { Resource } from "../../util/model/resource.entity";

@Entity()
export class Image extends Resource implements IImage {
    public static FILE_NAME_LENGTH = 128;
    public static FOLDER_LENGTH = 32;

    @Column({ type: "varchar", length: Image.FILE_NAME_LENGTH })
    fileName: string;

    @Column({ type: "varchar", length: Image.FOLDER_LENGTH })
    folder: string;
    uploaderId: string;
}
