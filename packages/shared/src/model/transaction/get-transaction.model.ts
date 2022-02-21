import { ITransaction } from "./transaction.model";

export type IGetTransaction = Partial<Pick<ITransaction, "type" | "profileId">>;
