import { Synbase } from "@synbase/shared";
import _ from "lodash";
import { getSession, GetSessionParams } from "next-auth/react";
import { ClientEnv } from "../constants/constants.client";
import { ISession } from "../model/auth/session.model";

const unauthorizedClient = new Synbase(ClientEnv.apiUrl);

export const getSynbase = async (context?: GetSessionParams): Promise<Synbase> => {
    if (_.isUndefined(context)) {
        return unauthorizedClient;
    }

    const session = (await getSession(context)) as ISession | null;

    if (_.isNull(session)) {
        return unauthorizedClient;
    }

    const client = new Synbase(ClientEnv.apiUrl);

    client.login(session.accessToken);

    return client;
};
