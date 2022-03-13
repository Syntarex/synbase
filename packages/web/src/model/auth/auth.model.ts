import { IProfile } from "@synbase/shared";
import { ISession } from "./session.model";

export interface IAuth {
    session: ISession | null;
    profile: IProfile | null;
}
