import "server-only";

import { getEnv } from "@/util/env";
import { Button, Stack, StackProps } from "@mui/material";
import { DiscordButton } from "../social/discord-button";
import { SyncTubeButton } from "../social/synctube-button";

export const Navigation = (props: StackProps) => {
    return (
        <Stack component={"nav"} direction={"row"} alignItems={"center"} spacing={1} {...props}>
            <DiscordButton size={"small"}>Discord</DiscordButton>

            <SyncTubeButton href={getEnv("SYNCTUBE_URL")} size={"small"}>
                SyncTube
            </SyncTubeButton>

            <Button href={"/blog"} size={"small"}>
                Blog
            </Button>

            <Button href={"/palworld"} size={"small"}>
                Palworld
            </Button>

            <Button href={"/clonehero"} size={"small"}>
                Clone Hero
            </Button>
        </Stack>
    );
};
