import "server-only";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button, SvgIcon } from "@mui/material";
import Link from "next/link";

// TODO: Wie kann ich GITHUB_URL sicher abfragen?
/**
 * Ein Button, welcher bei Klick auf das GitHub-Repository weiterleitet.
 */
export const GithubButton = () => {
    return (
        <Link href={process.env.GITHUB_URL as string} target={"_blank"}>
            <Button
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
        </Link>
    );
};
