import "server-only";

/**
 * Loggt in die Server-Konsole.
 */
export const log = (...data: unknown[]) => {
    console.info("🍉", ...data);
};

/**
 * Loggt in die Server-Konsole.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const success = (...data: any[]) => {
    console.info("✔", ...data);
};
