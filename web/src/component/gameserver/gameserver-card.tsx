import { checkUdp } from "@/util/server/udp";
import { CloudDone, CloudOff } from "@mui/icons-material";
import { Card, CardHeader, CardProps, Stack, Tooltip } from "@mui/material";
import { toString } from "lodash";
import { ReactNode } from "react";
import "server-only";

interface GameserverCardProps {
    title: string;
    ip: string;
    port: number;
    children?: ReactNode;
    slots?: {
        cardMedia?: ReactNode;
        cardActions?: ReactNode;
    };
    cardProps?: CardProps;
}

// TODO: Aktuell wird Status gecached. Füge Dynamic hinzu

/**
 * Zeigt Server-Informationen eines GameServers.
 */
export const GameserverCard = async ({ title, ip, port, children, slots = {}, cardProps }: GameserverCardProps) => {
    const isOnline = await checkUdp(ip, port);

    const address = `${ip}:${toString(port)}`;

    return (
        <Stack component={Card} {...cardProps}>
            <CardHeader
                title={title}
                avatar={
                    isOnline ? (
                        <Tooltip title={"Server ist online"}>
                            <CloudDone color={"success"} />
                        </Tooltip>
                    ) : (
                        <Tooltip title={"Server ist offline"}>
                            <CloudOff color={"error"} />
                        </Tooltip>
                    )
                }
                subheader={address}
            />

            {slots.cardMedia}

            {children}

            {slots.cardActions}
        </Stack>
    );
};
