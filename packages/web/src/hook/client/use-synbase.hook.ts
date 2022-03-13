import { useContext } from "react";
import { synbaseContext } from "../../component/client/synbase.provider";

export const useSynbase = () => {
    return useContext(synbaseContext);
};
