import "server-only";

/**
 * Loggt in die Server-Konsole.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = (...data: any[]) => {
    console.log("🍉", ...data);
};
