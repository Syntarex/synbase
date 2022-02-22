import { AxiosInstance } from "axios";

export abstract class RestClient {
    constructor(protected httpClient: AxiosInstance) {}
}
