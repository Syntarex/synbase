import "server-only";

import { SongList } from "@/component/clonehero/song-list";
import auth0, { checkScopes } from "@/util/auth0";

const AdminCloneHeroPage = auth0.withPageAuthRequired(async () => {
    await checkScopes(["read:page:admin"], {
        redirectTo: "/",
    });

    return <SongList />;
});

export default AdminCloneHeroPage;
