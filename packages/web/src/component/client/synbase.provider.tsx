import { useAuth0 } from "@auth0/auth0-react";
import { Synbase } from "@synbase/shared";
import { createContext, ReactNode, useEffect, useState } from "react";
import { CLIENT_ENV } from "../../constants/constants.client";
import { useErrors } from "../../hook/error/use-errors.hook";

const synbase = new Synbase(CLIENT_ENV.API_URL);
export const synbaseContext = createContext(synbase);

interface ISynbaseProviderProps {
    children: ReactNode;
}

/* TODO: Wenn man in einer anderen Komponente auf Synbase per Effect lauscht, triggert dieser zweimal. Irgendwo muss sich der Wert also für ihn ändern. */
export const SynbaseProvider = (props: ISynbaseProviderProps) => {
    const { children } = props;

    const [initialized, setInitialized] = useState(false);
    const [, addError] = useErrors();

    const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (!isAuthenticated) {
            if (synbase.isLoggedIn()) {
                synbase.logout();
            }

            setInitialized(true);
            return;
        }

        getAccessTokenSilently()
            .then((accessToken) => synbase.login(accessToken))
            .catch((error) => {
                if (synbase.isLoggedIn()) {
                    synbase.logout();
                }

                addError(error);
            })
            .finally(() => setInitialized(true));
    }, [isAuthenticated, isLoading, getAccessTokenSilently]);

    if (!initialized || isLoading) {
        return null;
    }

    return <synbaseContext.Provider value={synbase}>{children}</synbaseContext.Provider>;
};
