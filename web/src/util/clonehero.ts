/**
 * Formatiert Millisekunden als Song-Länge.
 * @example formatSongLength(390000) // "6:30"
 */
export const formatSongLength = (ms: number): string => {
    const lengthInSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(lengthInSeconds / 60);
    const seconds = lengthInSeconds % 60;
    return `${minutes}.${(seconds / 100).toFixed(2).substring(2)}`.replace(".", ":");
};
