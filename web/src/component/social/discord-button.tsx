import "server-only";

import { getEnv } from "@/util/env";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Button, ButtonProps, SvgIcon } from "@mui/material";

export const DiscordButton = (props: ButtonProps) => {
    const { href = getEnv("DISCORD_URL") } = props;

    return (
        <Button
            href={href}
            variant={"contained"}
            startIcon={
                <SvgIcon>
                    <SiDiscord />
                </SvgIcon>
            }
            size={"large"}
            color={"discord" as "inherit"} // TODO: https://mui.com/material-ui/customization/palette/#typescript 🥲
            {...props}
        />
    );
};
