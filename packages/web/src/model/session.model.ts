import { Session } from "next-auth";

export interface ISession extends Session {
    token: string;
}
