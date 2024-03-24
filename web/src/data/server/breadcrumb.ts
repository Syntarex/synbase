import "server-only";

import { cache, purgeCache } from "@/util/server/cache";
import Database, { Prisma } from "@synbase/database";
import { find } from "lodash";

/**
 * Gibt eine Map zurück, welche Pfad zu Titel enthält.
 */
export const getBreadcrumbs = cache({
    cacheKey: "breadcrumbs",
    cacheFn: async () => await Database.breadcrumb.findMany(),
});

/**
 * Speichert einen Titel, welcher für einen Pfad angezeigt wird.
 * @param path Der relative Pfad zur Seite für welche ein Breadcrumb erzeugt wird.
 * @param title Der Titel, welcher für diesen Breadcrumb angezeigt wird.
 * @param force Wenn angegeben, wird der bestehende Titel überschrieben, auch wenn dieser bereits existiert.
 * @example setBreadcrumb("/gameserver", "Game Server");
 */
export const setBreadcrumb = async (data: Prisma.BreadcrumbCreateInput) => {
    // Frage Breadcrumb-Elemente ab
    const breadcrumbs = await getBreadcrumbs();

    // Suche Breadcrumb-Element für diese Seite
    const breadcrumb = find(breadcrumbs, (each) => each.path === data.path) ?? null;

    // Element hat sich nicht geändert
    if (breadcrumb?.title === data.title) {
        return;
    }

    // Es gab schon ein Element, also aktualisiere dieses
    if (breadcrumb) {
        await Database.breadcrumb.update({
            data,
            where: { id: breadcrumb.id },
        });
    }
    // Es gab kein Element, also erstelle eines
    else {
        await Database.breadcrumb.create({
            data,
        });
    }

    // Leere letzten Cache
    purgeCache("breadcrumbs");
};
