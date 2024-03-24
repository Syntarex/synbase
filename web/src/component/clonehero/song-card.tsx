import "server-only";

import { formatSongLength } from "@/util/clonehero";
import { Card, CardContent, CardHeader, Stack, StackProps, Tooltip, Typography } from "@mui/material";
import { Song } from "@synbase/clonehero";
import { ReactNode } from "react";

interface SongCardProps {
    value: Song;
    stackProps?: StackProps;
    slots?: {
        cardActions?: ReactNode;
    };
}

export const SongCard = ({ value, stackProps, slots = {} }: SongCardProps) => {
    const { Name, Artist, Album, Year, Genre, Playlist, songlength } = value;

    // Die Länge des Songs
    const FormattedSongLength = formatSongLength(songlength);

    // Playlist ist im Format Playlist\Kapitel\Abschnitt eingeteilt
    // Der Playlist-Name
    const FormattedPlaylist = Playlist.split("\\")[0];

    return (
        <Stack component={Card} direction={"row"} gap={2} {...stackProps}>
            {/* TODO: Albumcover */}

            <Stack
                component={CardHeader}
                title={Name}
                subheader={
                    <Tooltip title={"Künstler | Album | Jahr"} placement={"right"}>
                        <Typography variant={"subtitle2"}>
                            <strong>{Artist}</strong> | {Album} | {Year}
                        </Typography>
                    </Tooltip>
                }
                flexGrow={1}
                alignItems={"flex-start"}
            />

            <Stack component={CardContent} gap={1} alignItems={"flex-end"}>
                <Tooltip title={"Genre | Länge"} placement={"left"}>
                    <Typography variant={"body2"} fontWeight={600}>
                        {Genre} | {FormattedSongLength}
                    </Typography>
                </Tooltip>

                <Tooltip title={"Song-Paket"} placement={"left"}>
                    <Typography variant={"body2"}>{FormattedPlaylist}</Typography>
                </Tooltip>
            </Stack>

            {slots.cardActions}
        </Stack>
    );
};
