import "server-only";

import { Card, CardContent, CardHeader, Stack, SxProps, Tooltip, Typography } from "@mui/material";
import { Song } from "@synbase/clonehero";

interface SongCardProps {
    sx?: SxProps;
    value: Song;
}

export const SongCard = ({ sx, value }: SongCardProps) => {
    const { Name, Artist, Album, Year, Genre, Playlist, songlength } = value;

    // TODO: Refactore
    // Die Länge des Songs im Format Minuten:Sekunden
    const lengthInSeconds = Math.floor(songlength / 1000);
    const minutes = Math.floor(lengthInSeconds / 60);
    const seconds = lengthInSeconds % 60;
    const FormattedSongLength = `${minutes}.${(seconds / 100).toFixed(2).substring(2)}`.replace(".", ":");

    // Playlist ist im Format Playlist\Kapitel\Abschnitt eingeteilt
    // Der Playlist-Name
    const FormattedPlaylist = Playlist.split("\\")[0];

    return (
        <Stack sx={sx} component={Card} direction={"row"} justifyContent={"space-between"}>
            {/*   TODO: Albumcover
            <CardMedia sx={{ "& > img": { width: "100%", height: "auto" } }}>
                <Image src={"/placeholder.png"} alt={title} width={1600} height={900} />
            </CardMedia> */}

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
            />

            <Stack component={CardContent} spacing={1} alignItems={"flex-end"}>
                <Tooltip title={"Genre | Länge"} placement={"left"}>
                    <Typography variant={"body2"} fontWeight={600}>
                        {Genre} | {FormattedSongLength}
                    </Typography>
                </Tooltip>

                <Tooltip title={"Song-Paket"} placement={"left"}>
                    <Typography variant={"body2"}>{FormattedPlaylist}</Typography>
                </Tooltip>
            </Stack>
        </Stack>
    );
};