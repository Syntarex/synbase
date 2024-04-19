import "server-only";

import { Song, SongSchema } from "@/model/clonehero";
import { Stack, StackProps } from "@mui/material";
import { SongCard } from "./song-card";

interface SongListProps {
    stackProps?: StackProps;
}

export const SongList = async ({ stackProps }: SongListProps) => {
    // Lade die exportierten Clone Hero Songs
    const json = await import("@synbase/clonehero/songs.json");
    const songs: Song[] = SongSchema.array().parse(json.default);

    return (
        <Stack gap={2} {...stackProps}>
            {songs.map((song, index) => (
                <SongCard key={`song-${index}`} value={song} />
            ))}
        </Stack>
    );
};
