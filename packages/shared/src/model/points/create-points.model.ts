import { IPoints } from "./points.model";

export type ICreatePoints = Pick<IPoints, "source" | "profileId" | "amount" | "notes">;
