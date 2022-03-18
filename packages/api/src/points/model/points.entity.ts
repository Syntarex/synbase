import { IPoints, PointsConstants, PointsSource } from "@synbase/shared";
import { Column, Entity, ManyToOne } from "typeorm";
import { Profile } from "../../profile/model/profile.entity";
import { Resource } from "../../util/model/resource.entity";

const { NOTES_LENGTH } = PointsConstants;

@Entity()
export class Points extends Resource implements IPoints {
    @Column({ type: "integer" })
    amount: number;

    @Column({ type: "varchar", length: NOTES_LENGTH, nullable: true })
    notes: string | null;

    @ManyToOne(() => Profile)
    profile: Promise<Profile>;

    @Column()
    profileId: string;

    @Column({ type: "enum", enum: PointsSource })
    source: PointsSource;
}
