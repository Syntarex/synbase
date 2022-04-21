import { IResource } from "..";

export enum PointsSource {
    ADMIN_ACTION = 0,
}

export interface IPoints extends IResource {
    source: PointsSource;
    profileId: string;
    amount: number;
    notes: string;
}
