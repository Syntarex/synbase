import "server-only";

import { PlausibleEmbed } from "@/component/plausible/plausible-embed";
import auth0, { checkScopes } from "@/util/auth0";

const PlausiblePage = auth0.withPageAuthRequired(async () => {
    await checkScopes(["read:page:admin"], {
        redirectTo: "/",
    });

    return <PlausibleEmbed sx={{ height: 1600 }} />;
});

export default PlausiblePage;
