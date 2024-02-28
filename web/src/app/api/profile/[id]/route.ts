import { RouteProps } from "@/model/next";
import auth0 from "@/util/auth0";
import Database from "@synbase/database";
import { isString } from "lodash";
import { AppConfigDynamic } from "next/dist/build/utils";
import { NextRequest } from "next/server";

export const dynamic: AppConfigDynamic = "force-dynamic";

export const GET = async (req: NextRequest, { params }: RouteProps<{ id: string }>) => {
    // Benutzer frägt /me ab
    if (params.id === "me") {
        // Frage Benutzer Session ab
        const session = await auth0.getSession();

        // TODO: HttpErrors
        // Benutzer ist nicht eingeloggt
        if (!isString(session?.user.sub)) {
            return new Response(
                JSON.stringify({
                    message: "buh",
                }),
                {
                    status: 401,
                },
            );
        }

        // Profil des Benutzers
        const profile = await Database.profile.findUnique({
            where: { sub: session.user.sub },
        });

        // Benutzer hat ein Profil
        if (profile) {
            return Response.json(profile);
        }

        // Benutzer hat kein Profil, also erstelle eins
        const ensuredProfile = await Database.profile.create({ data: { sub: session.user.sub } });

        return Response.json(ensuredProfile);
    }

    // Profil mit ID
    const profile = await Database.profile.findUnique({
        where: { id: params.id },
    });

    return Response.json(profile);
};
