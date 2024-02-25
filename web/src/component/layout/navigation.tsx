import "server-only";

import { getEnv } from "@/util/env";
import { Button, Stack, StackProps, Tooltip } from "@mui/material";
import { DiscordButton } from "../social/discord-button";
import { SyncTubeButton } from "../social/synctube-button";

export const Navigation = (props: StackProps) => {
    return (
        <Stack component={"nav"} direction={"row"} alignItems={"center"} gap={1} {...props}>
            <Tooltip title={"Willkommen in der tollsten Community der Welt."}>
                <DiscordButton size={"small"}>Discord</DiscordButton>
            </Tooltip>

            <Tooltip title={"Fester SyncTube-Raum zum gemeinsamen YouTube-Videos schauen."}>
                <SyncTubeButton href={getEnv("SYNCTUBE_URL")} size={"small"}>
                    SyncTube
                </SyncTubeButton>
            </Tooltip>

            <Button href={"/blog"}>Blog</Button>

            <Button href={"/palworld"}>Palworld</Button>
        </Stack>
    );
};
