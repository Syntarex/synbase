import { z } from "zod";

/**
 * Ein Song-Objekt, welches bei "Songs exportieren" in Clone Hero exportiert wird.
 */
export const SongSchema = z.object({
    Name: z.string(),
    Artist: z.string(),
    Album: z.string(),
    Genre: z.string(),
    Charter: z.string() /** Der Name des Chart-Erstellers. */,
    Year: z.string(),
    Playlist: z.string() /** Die Playlist des Songs. Format: Playlist-Name\Kapitel */,
    lyrics: z.boolean(),
    modchart: z.boolean() /** Ist es ein modifizierter Chart? */,
    songlength: z.number().transform((value) => {
        const lengthInSeconds = Math.floor(value / 1000);
        const minutes = Math.floor(lengthInSeconds / 60);
        const seconds = lengthInSeconds % 60;

        return `${minutes}.${(seconds / 100).toFixed(2).substring(2)}`.replace(".", ":");
    }),
    chartsAvailable: z.number(),
});

export type Song = z.infer<typeof SongSchema>;
