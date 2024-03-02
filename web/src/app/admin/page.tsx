import "server-only";

import auth0, { checkScopes } from "@/util/auth0";
import { Stack, Typography } from "@mui/material";

const AdminPage = auth0.withPageAuthRequired(async () => {
    await checkScopes(["read:page:admin"]);

    return (
        <Stack spacing={2}>
            <Typography variant={"h1"}>Admin Dashboard</Typography>

            <Typography>TBD</Typography>
        </Stack>
    );
});

export default AdminPage;
