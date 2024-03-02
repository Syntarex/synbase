import "server-only";

import auth0 from "@/util/auth0";
import { Stack, Typography } from "@mui/material";

const AdminPage = auth0.withPageAuthRequired(async () => {
    //await checkScopes("read:page:admin");

    // Die Sitzung des Benutzers
    //const session = await auth0.getSession();

    // Benutzer ist nicht angemeldet oder hat keine Scopes
    //if (!session?.accessTokenScope) {
    //    redirect("/", RedirectType.replace);
    //}

    // Die Scopes des Benutzers
    //const ownedScopes = session.accessTokenScope.split(" ");

    // Die Scopes die dem Benutzer fehlen
    //const missingScopes = without(["read:page:admin"], ...[]);

    // Dem Benutzer fehlen Scopes
    //if (missingScopes.length > 0) {
    //    redirect("/", RedirectType.replace);
    //}

    return (
        <Stack spacing={2}>
            <Typography variant={"h1"}>Admin Dashboard</Typography>

            <Typography>TBD</Typography>
        </Stack>
    );
});

export default AdminPage;
