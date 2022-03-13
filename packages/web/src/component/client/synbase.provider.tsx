import { Synbase } from "@synbase/shared";
import _ from "lodash";
import React, { createContext } from "react";
import { ClientEnv } from "../../constants/constants.client";
import { useSession } from "../../hook/auth/use-session.hook";

export const synbaseContext = createContext<Synbase | null>(null);

interface ISynbaseProviderProps {
    children: React.ReactNode;
}

export const SynbaseProvider = (props: ISynbaseProviderProps) => {
    const { children } = props;

    const synbase = React.useMemo(() => new Synbase(ClientEnv.apiUrl), []);

    const auth = useSession();

    React.useEffect(() => {
        if (_.isNull(auth)) {
            synbase.logout();
            return;
        }

        synbase.login(auth.accessToken);
    }, [auth]);

    return <synbaseContext.Provider value={synbase}>{children}</synbaseContext.Provider>;
};
