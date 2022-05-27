import { NextApiRequest, NextApiResponse } from "next";
import { ServerEnv } from "../../../constants/constants.server";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const path = `${ServerEnv.keycloakUrl}/realms/${
        ServerEnv.keycloakRealm
    }/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent(ServerEnv.webUrl)}`;

    res.status(200).json({ path });
};
