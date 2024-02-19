import "server-only";

// TODO: Funktioniert nur serverseitig. Wie kann ich Umgebungsvariablen auf clientseitig typensicher abfragen?
/**
 * Gibt eine existierende Umgebungsvariable zurück.
 */
export const getEnv = <T = string>(key: string): T => {
    const value = process.env?.[key];

    if (!value) {
        throw new Error(`Die Umgebungsvariable "${key}" wurde nicht gefunden.`);
    }

    return value as T;
};
