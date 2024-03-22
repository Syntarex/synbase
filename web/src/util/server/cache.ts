import { toString } from "lodash";
import { revalidateTag, unstable_cache } from "next/cache";
import { success } from "../log";
import { getQueryClient } from "./query";

interface CacheOptions<Result, Param> {
    cacheKey: string;
    cacheFn: (param: Param) => Promise<Result>;
    cacheTime?: number;
}

// TODO: JSDocs: Cached in QueryClient-Singleton und in NextJS-Cache
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

// TODO: JSDocs
export const purgeCache = (cacheKey: string) => {
    revalidateTag(cacheKey);
};
