import { NextApiRequest, NextApiResponse } from "next";
import { Urls } from "../../../constants/constants.client";
import { ServerEnv } from "../../../constants/constants.server";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const path = `${ServerEnv.keycloakUrl}/realms/${
        ServerEnv.keycloakRealm
    }/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent(ServerEnv.webUrl)}${Urls.Logout.path}`;

    res.status(200).json({ path });
};
