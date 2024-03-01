import "server-only";

import { CloudDone, CloudOff } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import isPortReachable from "is-port-reachable";
import { AppConfigDynamic } from "next/dist/build/utils";

export const dynamic: AppConfigDynamic = "force-dynamic";

const PalworldPage = async () => {
    // TODO: Port in Umgebungsvariable
    // Ist der Palworld Server erreichbar?
    const serverOnline = await isPortReachable(8211, {
        host: "palworld",
    });

    const color = serverOnline ? "success" : "error";

    return (
        <Stack spacing={2}>
            <Typography variant={"h1"}>Palworld Server</Typography>

            <Typography>Die Synbase hat einen eigenen Palworld Server!</Typography>

            <Stack color={"error"} direction={"row"} alignItems={"center"} spacing={1}>
                {serverOnline ? <CloudDone color={color} /> : <CloudOff />}

                <Typography variant={"subtitle1"} color={color} fontWeight={600}>
                    {serverOnline ? "Online" : "Offline"}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default PalworldPage;
