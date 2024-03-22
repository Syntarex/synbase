import "server-only";

import { auth0 } from "@/util/server/auth0";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// https://uploadthing.com
const uploadThing = createUploadthing();

export const uploadRouter = {
    imageUploader: uploadThing({ image: { maxFileSize: "4MB" } })
        .middleware(async () => {
            // Die Sitzung des aktuellen Benutzers
            const session = await auth0.getSession();

            // Kein Benutzer eingeloggt, also ist kein Upload erlaubt
            if (!session) {
                throw new UploadThingError("Unauthorized");
            }

            // Sende Metadata an onUploadComplete
            return { user: session.user };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // TODO: Sende auswertbare Antwort
            // Sende Antwort an onClientUploadComplete
            return {};
        }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
