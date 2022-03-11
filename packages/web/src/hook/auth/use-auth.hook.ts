import { useSession } from "next-auth/react";
import { ISession } from "../../model/auth/session.model";

export const useAuth = (): ISession | null => {
    const { data: session } = useSession();

    return session as ISession | null;
};
