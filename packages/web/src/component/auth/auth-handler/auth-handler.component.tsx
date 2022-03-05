import _ from "lodash";
import { useSession } from "next-auth/react";
import React from "react";
import { browserClient } from "../../../client/browser.client";
import { ISession } from "../../../model/auth/session.model";

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
            browserClient.login((session as ISession).accessToken);
        } else {
            browserClient.logout();
        }

        setInitialized(true);
    }, [session]);

    if (!initialized) {
        return null;
    }

    return <>{children}</>;
};
