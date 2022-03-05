import { Session } from "next-auth";

export interface ISession extends Session {
    accessToken: string;
    userId: string;
}
