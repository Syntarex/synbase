import _ from "lodash";
import { useSession } from "next-auth/react";
import React from "react";
import { synbase } from "../../../client/synbase.client";
import { ISession } from "../../../model/session.model";

interface IAuthHandler {
    children: React.ReactNode;
}

export const AuthHandler = (props: IAuthHandler) => {
    const { children } = props;

    const { data: session } = useSession();

    const [initialized, setInitialized] = React.useState(false);

    React.useEffect(() => {
        if (_.isUndefined(session)) {
            return;
        }

        if (!_.isNull(session)) {
            synbase.login((session as ISession).accessToken);
        } else {
            synbase.logout();
        }

        setInitialized(true);
    }, [session]);

    if (!initialized) {
        return null;
    }

    return <>{children}</>;
};
