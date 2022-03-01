import _ from "lodash";
import { useSession as useNextSession } from "next-auth/react";
import { ISession } from "../model/session.model";

export const useSession = (): ISession | null => {
    const { data } = useNextSession();

    if (_.isNull(data)) {
        return null;
    }

    return data as ISession;
};
