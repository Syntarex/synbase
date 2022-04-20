import { BlogItemConstants, BlogItemFormat, IBlogItem } from "@synbase/shared";
import { Column, Entity, ManyToOne } from "typeorm";
import { Image } from "../../image/model/image.entity";
import { Profile } from "../../profile/model/profile.entity";
import { Resource } from "../../util/model/resource.entity";

const { TITLE_LENGTH, SUMMARY_LENGTH, SLUG_MAX_LENGTH } = BlogItemConstants;

@Entity()
export class BlogItem extends Resource implements IBlogItem {
    @Column({ type: "varchar", length: TITLE_LENGTH })
    title: string;

    @Column({ type: "varchar", length: SUMMARY_LENGTH, nullable: true })
    summary: string | null;

    @ManyToOne(() => Profile)
    author: Promise<Profile>;

    @Column()
    authorId: string;

    @Column({ type: "text", nullable: true })
    content: string | null;

    @Column({ type: "boolean", default: true })
    isDraft: boolean;

    @Column({ type: "varchar", length: SLUG_MAX_LENGTH, unique: true })
    slug: string;

    @Column({ type: "enum", enum: BlogItemFormat })
    format: BlogItemFormat;

    @ManyToOne(() => Image, { nullable: true, onDelete: "SET NULL" })
    image: Promise<Image | null>;

    @Column({ nullable: true })
    imageId: string | null;
}
