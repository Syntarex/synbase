import { IPoints } from "./points.model";

export type IGetMyPoints = Partial<Pick<IPoints, "source" | "amount">>;
