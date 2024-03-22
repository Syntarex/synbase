import "server-only";

import { LayoutProps } from "@/model/next";
import { checkScopes } from "@/util/server/auth/auth0";
import { Newspaper, QueueMusic, StackedLineChart } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";

// TODO: Tabs zeigen nicht aktuelle Seite an
const AdminLayout = async ({ children }: LayoutProps) => {
    await checkScopes(["read:page:admin"], {
        redirectTo: "/",
    });

    return (
        <Stack spacing={4}>
            <Tabs variant={"scrollable"}>
                <Tab href={"/admin/plausible"} label={"Statistiken"} icon={<StackedLineChart />} />
                <Tab href={"/admin/clonehero"} label={"Clone Hero"} icon={<QueueMusic />} />
                <Tab href={"/admin/blog"} label={"Blog"} icon={<Newspaper />} />
            </Tabs>

            <Box>{children}</Box>
        </Stack>
    );
};

export default AdminLayout;
