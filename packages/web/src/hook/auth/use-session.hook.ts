import { useSession as useNextSession } from "next-auth/react";
import { ISession } from "../../model/auth/session.model";

export const useSession = (): ISession | null | undefined => {
    const { data, status } = useNextSession();

    switch (status) {
        case "loading":
            return undefined;
        case "unauthenticated":
            return null;
        case "authenticated":
            return data as ISession | null;
    }
};
