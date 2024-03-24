import "server-only";

import { upsertBreadcrumb } from "@/data/server/breadcrumb";
import { Stack, Typography } from "@mui/material";

const AdminPage = async () => {
    await upsertBreadcrumb({ path: "/admin", title: "Admin" });

    return (
        <Stack gap={4}>
            <Typography variant={"h1"}>Admin Dashboard</Typography>

            <Typography>Willkommen im Admin Dashboard. Sieh dich in Ruhe um. 😙</Typography>
        </Stack>
    );
};

export default AdminPage;
