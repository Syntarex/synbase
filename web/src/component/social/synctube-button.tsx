import "server-only";

import { getEnv } from "@/util/env";
import { SiYoutube } from "@icons-pack/react-simple-icons";
import { Button, ButtonProps, SvgIcon } from "@mui/material";

export const SyncTubeButton = (props: ButtonProps) => {
    const { href = getEnv("SYNCTUBE_URL") } = props;

    return (
        <Button
            href={href}
            variant={"contained"}
            startIcon={
                <SvgIcon>
                    <SiYoutube />
                </SvgIcon>
            }
            size={"large"}
            color={"youtube" as "inherit"} // TODO: https://mui.com/material-ui/customization/palette/#typescript 🥲
            {...props}
        />
    );
};
