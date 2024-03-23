import "server-only";

import { PlausibleEmbed } from "@/component/plausible/plausible-embed";
import { Stack, Typography } from "@mui/material";

const AdminPlausiblePage = async () => {
    return (
        <Stack gap={2}>
            <Typography variant={"h1"}>Statistiken</Typography>

            <PlausibleEmbed sx={{ height: 1600 }} />
        </Stack>
    );
};

export default AdminPlausiblePage;
