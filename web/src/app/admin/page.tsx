import "server-only";

import { redirect } from "next/navigation";

const AdminPage = () => {
    redirect("/admin/plausible");
};

export default AdminPage;
