import { Icon } from "@iconify/react";
import { SxProps } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import React from "react";
import { Link } from "../../common/link.component";

interface ISocialsMenuProps {
    sx?: SxProps;
}

export const SocialsMenu = (props: ISocialsMenuProps) => {
    const { sx } = props;

    return (
        <Stack sx={sx} direction={"row"} alignItems={"center"}>
            <Link href={"/discord"}>
                <IconButton>
                    <Icon icon={"radix-icons:discord-logo"} />
                </IconButton>
            </Link>

            <Link href={"/twitch"}>
                <IconButton>
                    <Icon icon={"lucide:twitch"} />
                </IconButton>
            </Link>
        </Stack>
    );
};
