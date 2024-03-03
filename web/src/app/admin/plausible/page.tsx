import "server-only";

import { PlausibleEmbed } from "@/component/plausible/plausible-embed";

const AdminPlausiblePage = async () => {
    return <PlausibleEmbed sx={{ height: 1600 }} />;
};

export default AdminPlausiblePage;
