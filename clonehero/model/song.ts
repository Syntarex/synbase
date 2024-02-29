/**
 * Ein Song-Objekt, welches bei "Songs exportieren" in Clone Hero exportiert wird.
 */
export interface Song {
    Name: string;
    Artist: string;
    Album: string;
    Genre: string;
    Charter: string /** Der Name des Chart-Erstellers. */;
    Year: string;
    Playlist: string /** Die Playlist des Songs. Format: Playlist-Name\Kapitel */;
    lyrics: boolean;
    modchart: boolean /** Ist es ein modifizierter Chart? */;
    songlength: number /** In ms */;
    chartsAvailable: number;
}
