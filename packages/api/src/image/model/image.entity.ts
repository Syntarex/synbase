import { IImage } from "@synbase/shared";
import { Column, Entity } from "typeorm";
import { Length } from "../../constants";
import { Resource } from "../../util/model/resource.entity";

@Entity()
export class Image extends Resource implements IImage {
    public static TITLE_LENGTH = 64;

    @Column({ type: "varchar", length: Image.TITLE_LENGTH, nullable: true })
    title: string | null;

    @Column({ type: "varchar", length: Length.URL, unique: true })
    url: string;

    @Column({ type: "uuid", length: Length.UUID, unique: true })
    userId: string;
}
