import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button, SvgIcon } from "@mui/material";
import Link from "next/link";

// TODO: In Umgebungsvariable speichern
const githubUrl = "https://github.com/syntarex/synbase";

/**
 * Ein Button, welcher bei Klick auf das GitHub-Repository weiterleitet.
 */
export const GithubButton = () => {
    return (
        <Link href={githubUrl} target={"_blank"}>
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
