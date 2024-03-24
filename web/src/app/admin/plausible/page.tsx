import "server-only";

import { PlausibleEmbed } from "@/component/plausible/plausible-embed";
import { upsertBreadcrumb } from "@/data/server/breadcrumb";
import { Stack, Typography } from "@mui/material";

const AdminPlausiblePage = async () => {
    await upsertBreadcrumb({ path: "/admin/plausible", title: "Plausible" });

    return (
        <Stack gap={2}>
            <Typography variant={"h1"}>Statistiken</Typography>

            <PlausibleEmbed sx={{ height: 1600 }} />
        </Stack>
    );
};

export default AdminPlausiblePage;
