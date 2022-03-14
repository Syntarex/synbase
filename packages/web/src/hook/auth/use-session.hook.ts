import { useSession as useNextSession } from "next-auth/react";
import { ISession } from "../../model/auth/session.model";

export const useSession = (): ISession | null | undefined => {
    const { data } = useNextSession();

    const session = data as ISession | null;

    return session;
};
