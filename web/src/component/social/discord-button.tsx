import { getEnv } from "@/util/env";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Button, ButtonProps, SvgIcon } from "@mui/material";
import Link from "next/link";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";

interface DiscordButtonProps {
    target?: HTMLAttributeAnchorTarget;
    href?: string;
    buttonProps?: ButtonProps;
    children?: ReactNode;
}

// TODO: Wie kann ich DISCORD_URL sicher abfragen?
/**
 * Ein Button, welcher bei Klick auf den Discord-Server weiterleitet.
 */
export const DiscordButton = ({
    target,
    href = getEnv<string>("DISCORD_URL"),
    buttonProps,
    children,
}: DiscordButtonProps) => {
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
