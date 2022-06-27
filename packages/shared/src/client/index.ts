import axios, { AxiosInstance } from "axios";
import _ from "lodash";
import { AppClient } from "./app/app.client";
import { BlogItemClient } from "./blog-item/blog-item.client";
import { ImageClient } from "./image/image.client";
import { PointsClient } from "./points/points.client";
import { ProfileClient } from "./profile/profile.client";

export class Synbase {
    private httpClient: AxiosInstance;

    public app: AppClient;
    public profiles: ProfileClient;
    public images: ImageClient;
    public points: PointsClient;
    public blogItems: BlogItemClient;

    constructor(baseUrl: string) {
        this.httpClient = axios.create({
            baseURL: baseUrl,
            responseType: "json",
        });

        this.httpClient.interceptors.response.use(
            (response) => response,
            (error) => {
                const { response } = error;

                if (_.isUndefined(response)) {
                    return Promise.reject(error);
                }

                if (_.isEqual(response.status, 404)) {
                    return Promise.resolve({
                        ...response,
                        data: null,
                    });
                }

                return Promise.reject(error);
            },
        );

        this.app = new AppClient(this.httpClient);
        this.profiles = new ProfileClient(this.httpClient);
        this.images = new ImageClient(this.httpClient);
        this.points = new PointsClient(this.httpClient);
        this.blogItems = new BlogItemClient(this.httpClient);
    }

    public login(token: string): void {
        this.httpClient.defaults.withCredentials = true;
        this.httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    public logout(): void {
        this.httpClient.defaults.withCredentials = false;
        delete this.httpClient.defaults.headers.common.Authorization;
    }

    public isLoggedIn(): boolean {
        const { withCredentials } = this.httpClient.defaults;

        if (_.isUndefined(withCredentials)) {
            return false;
        }

        return withCredentials;
    }
}
