import "server-only";

import { getEnv } from "@/util/server/env";
import { SiYoutube } from "@icons-pack/react-simple-icons";
import { Button, ButtonProps, SvgIcon } from "@mui/material";

/**
 * Ein Button, welcher auf den festen SyncTube-Raum weiterleitet.
 */
export const SyncTubeButton = (props: ButtonProps) => {
    const { href = getEnv("SYNCTUBE_URL") } = props;

    return (
        <Button
            href={href}
            variant={"contained"}
            startIcon={
                <SvgIcon>
                    {/* TODO: Warum genau muss ich die beiden Properties angeben? */}
                    <SiYoutube onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                </SvgIcon>
            }
            size={"large"}
            color={"youtube" as "inherit"} // TODO: https://mui.com/material-ui/customization/palette/#typescript 🥲
            {...props}
        />
    );
};
