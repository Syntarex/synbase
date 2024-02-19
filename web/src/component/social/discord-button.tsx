import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Button, SvgIcon } from "@mui/material";
import Link from "next/link";

// TODO: Wie kann ich DISCORD_URL sicher abfragen?
/**
 * Ein Button, welcher bei Klick auf den Discord-Server weiterleitet.
 */
export const DiscordButton = () => {
    return (
        <Link href={process.env.DISCORD_URL as string} target={"_blank"}>
            <Button
                variant={"contained"}
                startIcon={
                    <SvgIcon>
                        <SiDiscord />
                    </SvgIcon>
                }
                color={"discord" as "inherit"} // TODO: https://mui.com/material-ui/customization/palette/#typescript 🥲
            >
                Beitreten
            </Button>
        </Link>
    );
};
