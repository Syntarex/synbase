import { IPoints, PointsSource } from "@synbase/shared";
import { Column, Entity, ManyToOne } from "typeorm";
import { Profile } from "../../profile/model/profile.entity";
import { Resource } from "../../util/model/resource.entity";

@Entity()
export class Points extends Resource implements IPoints {
    public static NOTES_LENGTH = 1000;
    public static AMOUNT_MAX = 1000000;

    @Column({ type: "integer" })
    amount: number;

    @Column({ type: "varchar", length: Points.NOTES_LENGTH, nullable: true })
    notes: string | null;

    @ManyToOne(() => Profile)
    profile: Promise<Profile>;

    @Column()
    profileId: string;

    @Column({ type: "enum", enum: PointsSource })
    source: PointsSource;
}
