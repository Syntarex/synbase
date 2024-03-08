"use client";

/**
 * Loggt in die Browser-Konsole.
 */
export const log = (...data: unknown[]) => {
    console.log("🍉", ...data);
};

/**
 * Loggt in die Browser-Konsole.
 */
export const fail = (...data: unknown[]) => {
    console.error("⛈️", ...data);
};
