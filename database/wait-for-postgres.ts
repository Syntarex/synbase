import { waitForPostgres } from "@jcoreio/wait-for-postgres";

/**
 * Ein Skript, welches die Erreichbarkeit einer PostgresSQL-Datenbank abwartet.
 * Wird in der Build-Chain genutzt:
 * database wird gestartet -> Skript wartet auf Erreichbarkeit -> Prisma migriert Schema ->  web wird gestartet
 */
try {
    console.log(
        `Warte auf Datenbank: ${process.env.POSTGRES_URL?.replace(process.env.POSTGRES_PASSWORD as string, "<passwordhidden>")}`,
    );

    await waitForPostgres({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        timeout: 30 * 1000, // 30 Sekunden
    });
} catch (ex) {
    throw new Error(`Wir haben gewartet und gewartet.. Die Datenbank ist einfach nicht erreichbar. 😢`);
}