import "server-only";

import { getEnv } from "@/util/server/env";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button, SvgIcon } from "@mui/material";

/**
 * Ein Button, welcher bei Klick auf das GitHub-Repository weiterleitet.
 */
export const GithubButton = () => {
    return (
        <Button
            href={getEnv("GITHUB_URL")}
            variant={"contained"}
            startIcon={
                <SvgIcon>
                    <SiGithub />
                </SvgIcon>
            }
            size={"small"}
            color={"github" as "inherit"} // TODO: https://mui.com/material-ui/customization/palette/#typescript 🥲
        >
            Open Source on GitHub
        </Button>
    );
};
