import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Button, SvgIcon, SxProps } from "@mui/material";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";

interface DiscordButtonProps {
    sx?: SxProps;
    target?: HTMLAttributeAnchorTarget;
    children?: ReactNode;
    href?: Url;
}

// TODO: Wie kann ich DISCORD_URL sicher abfragen?
/**
 * Ein Button, welcher bei Klick auf den Discord-Server weiterleitet.
 */
export const DiscordButton = (props: DiscordButtonProps) => {
    const { sx, target, children, href = process.env.DISCORD_URL as string } = props;

    return (
        <Link href={href} target={target}>
            <Button
                sx={sx}
                variant={"contained"}
                startIcon={
                    <SvgIcon>
                        <SiDiscord />
                    </SvgIcon>
                }
                size={"large"}
                color={"discord" as "inherit"} // TODO: https://mui.com/material-ui/customization/palette/#typescript 🥲
            >
                {children}
            </Button>
        </Link>
    );
};
