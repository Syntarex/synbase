import { IImage } from "./image.model";

export type IGetImage = Partial<Pick<IImage, "url" | "userId">>;
