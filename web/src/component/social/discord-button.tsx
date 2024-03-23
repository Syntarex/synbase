import "server-only";

import { getEnv } from "@/util/server/env";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Button, ButtonProps, SvgIcon } from "@mui/material";

/**
 * Ein Button, welcher auf die Einladung des Discord-Servers weiterleitet.
 */
export const DiscordButton = (props: ButtonProps) => {
    const { href = getEnv("DISCORD_URL") } = props;

    return (
        <Button
            href={href}
            variant={"contained"}
            startIcon={
                <SvgIcon>
                    {/* TODO: Warum genau muss ich die beiden Properties angeben? */}
                    <SiDiscord onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                </SvgIcon>
            }
            size={"large"}
            color={"discord" as "inherit"} // TODO: https://mui.com/material-ui/customization/palette/#typescript 🥲
            {...props}
        />
    );
};
