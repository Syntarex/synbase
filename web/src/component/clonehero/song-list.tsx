import "server-only";

import { Stack, SxProps } from "@mui/material";
import { Song } from "@synbase/clonehero";
import { SongCard } from "./song-card";

interface SongListProps {
    sx?: SxProps;
}

export const SongList = async ({ sx }: SongListProps) => {
    // Lade die exportierten Clone Hero Songs
    const json = await import("@synbase/clonehero/songs.json");
    const songs: Song[] = json.default;

    return (
        <Stack spacing={2}>
            {songs.map((song, index) => (
                <SongCard key={`song-${index}`} value={song} />
            ))}
        </Stack>
    );
};
