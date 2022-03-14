import { IPoints } from "@synbase/shared";
import { PointsSource } from "@synbase/shared/src/model/points/points.model";
import { Column, ManyToOne } from "typeorm";
import { Profile } from "../../profile/model/profile.entity";
import { Resource } from "../../util/model/resource.entity";

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

    /* TODO: Funktioniert das? */
    @ManyToOne(() => Profile, { nullable: true })
    sender: Promise<Profile | null>;

    @Column({ nullable: true })
    senderId: string | null;

    @Column({ type: "enum", enum: PointsSource })
    source: PointsSource;
}
