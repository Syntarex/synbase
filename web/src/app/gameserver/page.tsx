import "server-only";

import { checkUdp } from "@/util/server/udp";
import { CloudDone, CloudOff } from "@mui/icons-material";
import { Card, CardHeader, Stack, Tooltip, Typography } from "@mui/material";
import { AppConfigDynamic } from "next/dist/build/utils";

export const dynamic: AppConfigDynamic = "force-dynamic";

// TODO: Refactore
// TODO: Komponente auslagern und dynamic entsprechend anpassen
const GameServerPage = async () => {
    // TODO: URL und Port in Umgebungsvariable
    // Ist der Palworld Server erreichbar
    const serverOnline = await checkUdp("synbase.io", 8211);

    const color = serverOnline ? "success" : "error";

    return (
        <Stack spacing={2}>
            <Typography variant={"h1"}>Game Server</Typography>

            <Stack component={Card} maxWidth={320}>
                <CardHeader
                    title={"Palworld"}
                    subheader={
                        <Stack direction={"row"} alignItems={"center"} spacing={1}>
                            {serverOnline ? (
                                <Tooltip title={"Server ist online"}>
                                    <CloudDone color={color} />
                                </Tooltip>
                            ) : (
                                <Tooltip title={"Server ist offline"}>
                                    <CloudOff color={color} />
                                </Tooltip>
                            )}

                            <Typography variant={"subtitle2"} fontWeight={600}>
                                synbase.io:8211
                            </Typography>

                            {/* <IconButton size={"small"}>
                                <ContentCopy />
                            </IconButton> */}
                        </Stack>
                    }
                />

                {/*<CardContent>Beschreibungstext</CardContent>*/}
            </Stack>
        </Stack>
    );
};

export default GameServerPage;
