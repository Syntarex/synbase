import "server-only";

import { getBreadcrumbs } from "@/data/server/breadcrumb";
import { buildRoute } from "@/util/server/api";
import { Breadcrumb } from "@synbase/database";

export const GET = buildRoute<Breadcrumb[]>({
    handler: async () => await getBreadcrumbs(),
});
