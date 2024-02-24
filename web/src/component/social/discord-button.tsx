import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Button, ButtonProps, SvgIcon } from "@mui/material";
import Link from "next/link";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { UrlObject } from "url";

interface DiscordButtonProps {
    target?: HTMLAttributeAnchorTarget;
    href?: UrlObject;
    buttonProps?: ButtonProps;
    children?: ReactNode;
}

// TODO: Wie kann ich DISCORD_URL sicher abfragen?
/**
 * Ein Button, welcher bei Klick auf den Discord-Server weiterleitet.
 */
export const DiscordButton = (props: DiscordButtonProps) => {
    const { target, href = process.env.DISCORD_URL as string, buttonProps, children } = props;

    return (
        <Link href={href} target={target}>
            <Button
                variant={"contained"}
                startIcon={
                    <SvgIcon>
                        <SiDiscord />
                    </SvgIcon>
                }
                size={"large"}
                color={"discord" as "inherit"} // TODO: https://mui.com/material-ui/customization/palette/#typescript 🥲
                {...buttonProps}
            >
                {children}
            </Button>
        </Link>
    );
};
