import { Icon } from "@iconify/react";
import { SxProps } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { Link } from "../../common/link.component";

interface ISocialsMenuProps {
    sx?: SxProps;
}

export const SocialsMenu = (props: ISocialsMenuProps) => {
    const { sx } = props;

    return (
        <Stack sx={sx} direction={"row"} spacing={2} alignItems={"center"}>
            <Link href={"/discord"}>
                <Tooltip title={"Discord"}>
                    <IconButton>
                        <Icon icon={"radix-icons:discord-logo"} />
                    </IconButton>
                </Tooltip>
            </Link>

            <Link href={"/twitch"}>
                <Tooltip title={"Twitch"}>
                    <IconButton>
                        <Icon icon={"lucide:twitch"} />
                    </IconButton>
                </Tooltip>
            </Link>
        </Stack>
    );
};
