import "server-only";

import { LayoutProps } from "@/model/next";
import { QueueMusic, StackedLineChart } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";

const AdminLayout = async ({ children }: LayoutProps) => {
    return (
        <Stack direction={"row"} spacing={4}>
            <Tabs sx={{ maxWidth: 320 }} variant={"scrollable"} orientation={"vertical"}>
                <Tab href={"/admin"} label={"Plausible"} icon={<StackedLineChart />} />
                <Tab href={"/admin/clonehero"} label={"Clone Hero"} icon={<QueueMusic />} />
            </Tabs>

            <Box flexGrow={1}>{children}</Box>
        </Stack>
    );
};

export default AdminLayout;
