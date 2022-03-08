import { Icon } from "@iconify/react";
import { SxProps } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { Urls } from "../../../constants/constants.client";
import { Link } from "../../common/link/link.component";

interface ISocialsMenuProps {
    sx?: SxProps;
}

export const SocialsMenu = (props: ISocialsMenuProps) => {
    const { sx } = props;

    return (
        <Stack sx={sx} direction={"row"} spacing={2} alignItems={"center"}>
            <Link href={Urls.DiscordServer}>
                <Tooltip title={"Discord"}>
                    <IconButton>
                        <Icon icon={"radix-icons:discord-logo"} />
                    </IconButton>
                </Tooltip>
            </Link>

            <Link href={Urls.Twitch}>
                <Tooltip title={"Twitch"}>
                    <IconButton>
                        <Icon icon={"lucide:twitch"} />
                    </IconButton>
                </Tooltip>
            </Link>
        </Stack>
    );
};
