import { AxiosInstance } from "axios";
import { IImage } from "../model";

export abstract class RestClient {
    constructor(protected httpClient: AxiosInstance) {}

    protected async upload<T = IImage>(url: string, file: File): Promise<T> {
        const form = new FormData();

        form.append("file", file);

        return await this.httpClient.post(url, form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
}
