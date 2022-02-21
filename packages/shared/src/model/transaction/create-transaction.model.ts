import { ITransaction } from "./transaction.model";

export type ICreateTransaction = Pick<ITransaction, "type" | "profileId" | "points">;
