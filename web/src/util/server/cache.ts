import "server-only";

import { toString } from "lodash";
import { revalidateTag, unstable_cache } from "next/cache";
import { success } from "../log";
import { getQueryClient } from "./query";

interface CacheOptions<Result, Param> {
    cacheKey: string;
    cacheFn: (param: Param) => Promise<Result>;
    cacheTime?: number;
}

/**
 * Cached Daten, welche von `cacheFn` zurückgegeben werden zwischen.
 * Der Cache kann mit `purgeCache` und dem entsprechenden `cacheKey` geleert werden.
 * Die Daten werden außerdem in das serverseitig verfügbare Singleton von QueryClient gesetzt, sodass diese in Client-Komponenten prefetched sind.
 */
export function cache<Result = void, Param = void>({
    cacheKey,
    cacheFn,
    /** Ablaufzeit in Sekunden. */
    cacheTime,
}: CacheOptions<Result, Param>): (param: Param) => Promise<Result> {
    // Wir geben dem benutzer eine Proxy-Funktion zurück
    // Der Parameter hat den gleichen Typ, wie der Parameter von cacheFn
    return (param: Param) => {
        const func = async (param: Param) => {
            const result = await cacheFn(param);

            // Speichere Ergebnis in QueryClient als Prefetch
            getQueryClient().setQueryData(param ? [cacheKey, param] : [cacheKey], result);

            success("Cache wurde erstellt", cacheKey, toString(param));

            return result;
        };

        // Wir geben das Ergebnis der cache-Funktion von NextJS zurück
        // Den "durchgeschleusten" Parameter nutzen wir als Cache-Key
        return unstable_cache(func, [cacheKey, toString(param)], {
            tags: [cacheKey], // Den NextJS-Tag setzen wir auf cacheKey, sodass wir mit revalidateTag(cacheKey), den gesamten Cache für die Entität löschen können
            revalidate: cacheTime,
        })(param);
    };
}

/**
 * Leert einen Cache.
 * @param cacheKey Der `cacheKey`, welcher beim Erstellen des Caches, mithilfe von `cache()` angegeben wurde.
 */
export const purgeCache = (cacheKey: string) => {
    revalidateTag(cacheKey);
};
