import { Rcon } from "rcon-client";
import { getEnv } from "./env";

// FIXME: Funktioniert nicht.
/**
 *
 * Ein RCON-Client, welcher Kommunikation mit Palworld-Server ermöglicht.
 */
export const palworld = await Rcon.connect({
    host: "palworld",
    port: 25575,
    password: getEnv("PALWORLD_ADMIN_PASSWORD"),
});
