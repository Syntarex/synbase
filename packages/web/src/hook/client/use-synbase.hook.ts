import _ from "lodash";
import { useContext } from "react";
import { synbaseContext } from "../../component/client/synbase.provider";

export const useSynbase = () => {
    const synbase = useContext(synbaseContext);

    if (_.isNull(synbase)) {
        throw new Error("Please use the SynbaseProvider at the parent tree.");
    }

    return synbase;
};
