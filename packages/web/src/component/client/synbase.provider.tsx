import { Synbase } from "@synbase/shared";
import _ from "lodash";
import React, { createContext } from "react";
import { ClientEnv } from "../../constants/constants.client";
import { useSession } from "../../hook/auth/use-session.hook";

const synbase = new Synbase(ClientEnv.apiUrl);
export const synbaseContext = createContext(synbase);

interface ISynbaseProviderProps {
    children: React.ReactNode;
}

export const SynbaseProvider = (props: ISynbaseProviderProps) => {
    const { children } = props;

    const [initialized, setInitialized] = React.useState(false);

    const session = useSession();

    React.useEffect(() => {
        if (_.isUndefined(session)) {
            return;
        }

        if (_.isNull(session)) {
            synbase.logout();
        } else {
            synbase.login(session.accessToken);
        }

        if (!initialized) {
            setInitialized(true);
        }
    }, [session, initialized]);

    if (!initialized) {
        return null;
    }

    return <synbaseContext.Provider value={synbase}>{children}</synbaseContext.Provider>;
};
