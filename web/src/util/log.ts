/**
 * Logge eine Nachricht zum Entwickeln.
 * Wird in Produktivumgebung ignoriert.
 * @example log("my data", data, session);
 */
export const log = (...data: unknown[]) => {
    if (process.env.NODE_ENV === "production") {
        return;
    }

    console.log("[🎲]", ...data);
};

/**
 * Logge Informationen.
 * @example info("Token wird neu ausgestellt, da er abgelaufen ist", oldToken);
 */
export const info = (...data: unknown[]) => {
    console.info("[⚪️]", ...data);
};

/**
 * Logge erfolgreiche Aktionen.
 * @example success("Benutzer hat sich erfolgreich eingeloggt", user);
 */
export const success = (...data: unknown[]) => {
    console.info("[🟢]", ...data);
};

/**
 * Logge eine Warnung.
 * Wird in Produktivumgebung ignoriert.
 * @example warn("Wenig Arbeitsspeichert", remainingSpace);
 */
export const warn = (...data: unknown[]) => {
    console.warn("[🟡]", ...data);
};

/**
 * Loggt einen Fehler.
 * @example fail("Benutzer hat keinen Zugriff auf Seite", url);
 */
export const fail = (...data: unknown[]) => {
    console.error("[🔴]", ...data);
};
