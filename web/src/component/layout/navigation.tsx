import "server-only";

import { getEnv } from "@/util/env";
import { Box, Button, Stack, SxProps, Tooltip } from "@mui/material";
import { DiscordButton } from "../social/discord-button";
import { SyncTubeButton } from "../social/synctube-button";

interface NavigationProps {
    sx?: SxProps;
}

export const Navigation = ({ sx }: NavigationProps) => {
    return (
        <Box sx={sx} component={"nav"}>
            <Stack
                sx={{
                    p: 0,
                    listStyleType: "none",
                }}
                component={"ul"}
                direction={"row"}
                alignItems={"center"}
                gap={1}
            >
                <Tooltip title={"Willkommen in der tollsten Community der Welt."}>
                    <DiscordButton component={"li"} size={"small"}>
                        Discord
                    </DiscordButton>
                </Tooltip>

                <Tooltip title={"Fester SyncTube-Raum zum gemeinsamen YouTube-Videos schauen."}>
                    <SyncTubeButton component={"li"} href={getEnv("SYNCTUBE_URL")} size={"small"}>
                        SyncTube
                    </SyncTubeButton>
                </Tooltip>

                <Button component={"li"} href={"/blog"}>
                    Blog
                </Button>

                <Button component={"li"} href={"/palworld"}>
                    Palworld
                </Button>
            </Stack>
        </Box>
    );
};
