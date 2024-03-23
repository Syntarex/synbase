import "server-only";

import { Prisma } from "@synbase/database";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { ObjectSchema, ValidationError } from "yup";
import { checkScopes } from "./auth0";

/**
 * Eine API-Route.
 */
interface RouteDef<Output, Body, Params, SearchParams> {
    paramsValidation?: ObjectSchema<object>;
    searchParamsValidation?: ObjectSchema<object>;
    bodyValidation?: ObjectSchema<object>;
    requiredScopes?: string[] /** Die Scopes, welche benötigt werden um die Route zu nutzen. */;
    audience?: string /** Die Audience, für welche die Scopes geprüft werden sollen. */;
    handler: (data: {
        req: NextRequest;
        body: Body;
        params: Params;
        searchParams: SearchParams;
    }) => Promise<Output | null | NextResponse>;
}

/**
 * Erstellt eine API-Route und implementiert Standard-Verhalten.
 */
export function buildRoute<
    Output extends object,
    Body extends object = object,
    Params extends { [key: string]: string } = Record<string, string>,
    SearchParams extends { [key: string]: string } = Record<string, string>,
>(routeDef: RouteDef<Output, Body, Params, SearchParams>) {
    return async (req: NextRequest, props: { params: Params }) => {
        const bodyIsFormdata = req.headers.get("content-type")?.includes("multipart/form-data");
        const bodyIsJson = req.headers.get("content-type")?.includes("application/json");

        const body: Body = req.body ? (bodyIsFormdata ? await req.formData() : bodyIsJson ? await req.json() : {}) : {};
        const params: Params = props.params ?? {};

        const searchParams: SearchParams = Object.fromEntries(req.nextUrl.searchParams) as SearchParams;

        // Authentifizierung
        try {
            if (routeDef.requiredScopes) {
                const allowed = await checkScopes(routeDef.requiredScopes);

                if (!allowed) {
                    return NextResponse.json({ errors: ["Missing scopes"] }, { status: StatusCodes.FORBIDDEN });
                }
            }
        } catch (ex) {
            return NextResponse.json({ errors: ["Unauthorized"] }, { status: StatusCodes.UNAUTHORIZED });
        }

        // Validierung
        try {
            if (routeDef.paramsValidation) {
                await routeDef.paramsValidation.validate(params, { abortEarly: false, strict: true });
            }

            if (routeDef.searchParamsValidation) {
                await routeDef.searchParamsValidation.validate(searchParams, { abortEarly: false, strict: true });
            }

            if (routeDef.bodyValidation) {
                await routeDef.bodyValidation.validate(body, { abortEarly: false, strict: true });
            }
        } catch (ex) {
            if (ex instanceof ValidationError) {
                return NextResponse.json({ errors: ex.errors }, { status: StatusCodes.BAD_REQUEST });
            }

            return NextResponse.json({ errors: ["Unknown error"] }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
        }

        // Antworten
        try {
            const result = await routeDef.handler({ req, body, params, searchParams });

            if (!result) {
                return NextResponse.json({ errors: ["Not found"] }, { status: StatusCodes.NOT_FOUND });
            }

            // Es wurde eine Response vom Handler zurückgegeben
            if (result instanceof NextResponse) {
                return result;
            }

            return NextResponse.json(result);
        } catch (ex) {
            // Fange Prisma-Validierung ab
            if (ex instanceof Prisma.PrismaClientValidationError) {
                return NextResponse.json({ errors: [ex.message] }, { status: StatusCodes.BAD_REQUEST });
            }

            // Fange Prisma-Fehler ab
            // https://www.prisma.io/docs/orm/reference/error-reference#error-codes
            if (ex instanceof Prisma.PrismaClientKnownRequestError) {
                switch (ex.code) {
                    case "P2000": // Wert zu lang
                    case "P2001": // Ungültige Where
                    case "P2002": // Unique Contraint verletzt
                    case "P2003": // Foreign Key nicht vorhanden
                    case "P2004": // Constraints verletzt
                    case "P2005": // Falscher Typ
                    case "P2006": // Validierung von Wert fehlgeschlagen
                    case "P2007": // Validierung von Datenbestand fehlgeschlagen
                    case "P2009": // Validierung von SQL Query fehlgeschlagen
                    case "P2011": // Null darf nicht gesetzt werden
                    case "P2012": // Wert fehlt
                    case "P2014": // Fehlerhafte Beziehung
                    case "P2015": // Fehlerhafte Beziehung
                    case "P2017": // Fehlerhafte Beziehung
                    case "P2018": // Fehlerhafte Beziehung
                    case "P2019": // Fehlerhafter Input
                    case "P2020": // Validierung von Wert fehlgeschlagen
                        return NextResponse.json({ errors: [ex.message] }, { status: StatusCodes.BAD_REQUEST });
                }
            }

            if (ex instanceof Error) {
                return NextResponse.json({ errors: [ex.message] }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
            }

            return NextResponse.json({ errors: ["Unknown error"] }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
        }
    };
}
