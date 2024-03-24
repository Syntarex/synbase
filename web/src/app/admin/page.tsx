import "server-only";

import { upsertBreadcrumb } from "@/data/server/breadcrumb";
import { redirect } from "next/navigation";

const AdminPage = async () => {
    await upsertBreadcrumb({ path: "/admin", title: "Admin" });

    redirect("/admin/plausible");
};

export default AdminPage;
