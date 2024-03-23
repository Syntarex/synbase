import "server-only";

import { getEnv } from "@/util/server/env";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button, ButtonProps, SvgIcon } from "@mui/material";

/**
 * Ein Button, welcher bei Klick auf das GitHub-Repository weiterleitet.
 */
export const GithubButton = (props: ButtonProps) => {
    return (
        <Button
            href={getEnv("GITHUB_URL")}
            variant={"contained"}
            startIcon={
                <SvgIcon>
                    {/* TODO: Warum genau muss ich die beiden Properties angeben? */}
                    <SiGithub onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                </SvgIcon>
            }
            size={"small"}
            color={"github" as "inherit"} // TODO: https://mui.com/material-ui/customization/palette/#typescript 🥲
            {...props}
        >
            Open Source on GitHub
        </Button>
    );
};
