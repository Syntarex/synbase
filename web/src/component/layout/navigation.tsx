import "server-only";

import { getEnv } from "@/util/env";
import { Newspaper, SportsEsports } from "@mui/icons-material";
import { Button, Divider, Stack, StackProps } from "@mui/material";
import { DiscordButton } from "../social/discord-button";
import { SyncTubeButton } from "../social/synctube-button";

export const Navigation = (props: StackProps) => {
    return (
        <Stack component={"nav"} direction={"row"} alignItems={"center"} spacing={1} {...props}>
            <DiscordButton size={"small"}>Discord</DiscordButton>

            <SyncTubeButton href={getEnv("SYNCTUBE_URL")} size={"small"}>
                SyncTube
            </SyncTubeButton>

            <Divider sx={{ height: 22 }} orientation={"vertical"} />

            <Button href={"/blog"} startIcon={<Newspaper />} size={"small"}>
                Blog
            </Button>

            <Button href={"/gameserver"} startIcon={<SportsEsports />} size={"small"}>
                Game Server
            </Button>
        </Stack>
    );
};
