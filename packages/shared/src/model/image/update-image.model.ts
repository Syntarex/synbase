import { IImage } from "./image.model";

export type IUpdateImage = Partial<Pick<IImage, "title">>;
