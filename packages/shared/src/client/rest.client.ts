import { AxiosInstance } from "axios";

export abstract class RestClient {
    constructor(protected httpClient: AxiosInstance) {}

    protected async upload(url: string, file: File): Promise<void> {
        const form = new FormData();

        form.append("file", file);

        await this.httpClient.post(url, form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
}
