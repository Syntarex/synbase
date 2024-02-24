import { PrismaClient } from "@prisma/client";

// Erstellt Datenbank-Client
const prismaClientSingleton = () => {
    return new PrismaClient();
};

// Setze Typen des Datenbank-Client in globalThis-namespace
declare global {
    // Das Singleton!
    // Nutze var, sodass die Variable wirklich im globalen Kontext initialisiert wird.
    // let oder const würde die Variable auf dieses JavaScript-Modul einschränken.
    // eslint-disable-next-line no-var
    var DatabaseInstance: undefined | ReturnType<typeof prismaClientSingleton>;
}

/**
 * Ein globaler Datenbank-Client. 🚀
 */
const Database = globalThis.DatabaseInstance ?? prismaClientSingleton();

// Exportiere Datenbank-Client
export default Database;

// Exportiere Datenbank-Models
export * from "@prisma/client";

// Nutze Singleton nur, wenn wir im lokalen Betrieb sind
// Im lokalen Betrieb startet der Next.js-Server neu, wenn eine Änderung am Code vorgenommen wird.
// Die Verbindung zur Datenbank, wird hierbei nicht geschlossen.
// Deshalb setze ich das Singleton, sodass die Verbindung, welche vor dem Neustart aufgebaut war, erhalten bleibt.
if (process.env.NODE_ENV !== "production") {
    globalThis.DatabaseInstance = Database;
}
