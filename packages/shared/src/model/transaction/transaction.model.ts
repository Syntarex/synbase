import { IResource } from "..";

export enum TransactionType {
    ADMIN_ACTION = 0,
}

export interface ITransaction extends IResource {
    type: TransactionType;
    profileId: string;
    points: number;
}
