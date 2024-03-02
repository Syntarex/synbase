import "server-only";

import auth0 from "@/util/auth0";
import { success } from "@/util/log/server";
import { StatusCodes } from "http-status-codes";
import { without } from "lodash";
import { NextResponse } from "next/server";

export const withScopesRequired = (...requiredScopes: string[]) =>
    auth0.withMiddlewareAuthRequired(async (req) => {
        const res = NextResponse.next();

        // Die Sitzung des Benutzers
        const session = await auth0.getSession(req, res);

        // Benutzer ist nicht angemeldet oder hat keine Scopes
        if (!session?.accessTokenScope) {
            return new NextResponse(null, { status: StatusCodes.UNAUTHORIZED });
        }

        // Die Scopes des Benutzers
        const ownedScopes = session.accessTokenScope.split(" ");

        // Die Scopes die dem Benutzer fehlen
        const missingScopes = without(requiredScopes, ...ownedScopes);

        // Dem Benutzer fehlen Scopes
        if (missingScopes.length > 0) {
            return new NextResponse(null, { status: StatusCodes.FORBIDDEN });
        }

        success(`${req.nextUrl}`, `${session.user?.nickname} loggt sich als Admin ein`);

        // Der Benutzer hat alle Scopes
        return res;
    });
