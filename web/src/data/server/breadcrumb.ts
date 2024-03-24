import "server-only";

import { cache } from "@/util/server/cache";
import Database, { Prisma } from "@synbase/database";

/**
 * Gibt eine Map zurück, welche Pfad zu Titel enthält.
 */
export const getBreadcrumbs = cache({
    cacheKey: "breadcrumbs",
    cacheFn: async () => await Database.breadcrumb.findMany(),
});

// TODO: benutzer muss Seite erst neuladen damit ein neuer Breadcrumb am Start ist
/**
 * Speichert einen Titel, welcher für einen Pfad angezeigt wird.
 */
export const upsertBreadcrumb = async (data: Prisma.BreadcrumbCreateInput) => {
    await Database.breadcrumb.upsert({
        create: data,
        update: data,
        where: { path: data.path },
    });
};
