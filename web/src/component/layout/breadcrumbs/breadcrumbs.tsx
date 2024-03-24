import { getBreadcrumbs } from "@/data/server/breadcrumb";
import { getQueryClient } from "@/util/server/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import "server-only";
import { BreadcrumbsClient } from "./_breadcrumbs";

export const Breadcrumbs = async () => {
    const queryClient = getQueryClient();
    const breadcrumbs = await getBreadcrumbs();

    queryClient.setQueryData(["breadcrumbs"], breadcrumbs);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <BreadcrumbsClient />
        </HydrationBoundary>
    );
};
