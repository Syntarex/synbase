import { IImage } from "./image.model";

export type IGetImages = Partial<Pick<IImage, "id" | "path" | "uploaderId" | "mimeType">>;
