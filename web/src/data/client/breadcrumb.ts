"use client";

import { api } from "@/util/client/api";
import { Breadcrumb } from "@synbase/database";
import { FetchQueryOptions } from "@tanstack/react-query";

export const getBreadcrumbsQuery = (): FetchQueryOptions<Breadcrumb[]> => ({
    queryKey: ["breadcrumbs"],
    queryFn: async () => await api.get("breadcrumbs").json(),
});
