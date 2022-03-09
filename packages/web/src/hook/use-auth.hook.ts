import { IProfile } from "@synbase/shared";
import _ from "lodash";
import { useSession } from "next-auth/react";
import React from "react";
import { ISession } from "../model/auth/session.model";

export const useAuth = (): ISession | null => {
    const { data: session } = useSession();

    return session as ISession | null;
};

/* TODO: Wird das irgendwo verwendet? */
export const useIsMyProfile = (profile: IProfile) => {
    const session = useAuth();

    return React.useMemo(() => _.isEqual(session?.userId, profile.id), [session, profile]);
};
