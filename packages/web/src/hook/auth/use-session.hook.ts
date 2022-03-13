import _ from "lodash";
import { useSession as useNextSession } from "next-auth/react";
import { ISession } from "../../model/auth/session.model";

export const useSession = (): ISession | null => {
    const { data } = useNextSession();

    if (_.isUndefined(data)) {
        return null;
    }

    const session = data as ISession | null;

    return session;
};
