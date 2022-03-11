import { Synbase } from "@synbase/shared";
import _ from "lodash";
import React, { createContext } from "react";
import { ClientEnv } from "../../constants/constants.client";
import { useAuth } from "../../hook/use-auth.hook";

export const synbaseContext = createContext<Synbase | null>(null);

interface ISynbaseProviderProps {
    children: React.ReactNode;
}

export const SynbaseProvider = (props: ISynbaseProviderProps) => {
    const { children } = props;

    const synbase = React.useMemo(() => new Synbase(ClientEnv.apiUrl), []);

    const auth = useAuth();

    React.useEffect(() => {
        console.log("AUTH ÄNDERT SICH");
        console.log(auth);
        if (_.isNull(auth)) {
            console.log("ausloggen.");
            synbase.logout();
            return;
        }

        console.log("einloggen.");
        synbase.login(auth.accessToken);
    }, [auth]);

    return <synbaseContext.Provider value={synbase}>{children}</synbaseContext.Provider>;
};
