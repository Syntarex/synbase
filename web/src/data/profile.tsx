import "server-only";

import { auth0 } from "@/util/server/auth/auth0";
import Database, { Profile } from "@synbase/database";

/**
 * Gibt den aktuellen Benutzer zurück.
 */
export const getMe = async (): Promise<Profile> => {
    // Die Sitzung des Benutzers
    const session = await auth0.getSession();

    // Es gibt keine Sitzung
    if (!session) {
        throw new Error("Keine aktive Benutzer-Sitzung.");
    }

    // Der Identifier des Benutzers
    const { sub } = session.user;

    // Das Profil des Benutzers
    const profile = await Database.profile.findUniqueOrThrow({
        where: {
            sub,
        },
    });

    return profile;
};
