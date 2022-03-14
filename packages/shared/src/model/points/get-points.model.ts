import { IPoints } from "./points.model";

export type IGetPoints = Partial<Pick<IPoints, "source" | "profileId" | "amount" | "senderId">>;
