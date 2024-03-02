import "server-only";

import { PlausibleEmbed } from "@/component/plausible/plausible-embed";
import auth0, { checkScopes } from "@/util/auth0";
import { Stack, Typography } from "@mui/material";

const AdminPage = auth0.withPageAuthRequired(async () => {
    await checkScopes(["read:page:admin"], {
        redirectTo: "/",
    });

    return (
        <Stack spacing={2}>
            <Typography variant={"h1"}>Admin Dashboard</Typography>

            <PlausibleEmbed sx={{ height: 1600 }} />
        </Stack>
    );
});

export default AdminPage;
