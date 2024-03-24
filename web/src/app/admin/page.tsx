import "server-only";

import { setBreadcrumb } from "@/data/server/breadcrumb";
import { redirect } from "next/navigation";

const AdminPage = async () => {
    await setBreadcrumb({ path: "/admin", title: "Admin" });

    redirect("/admin/plausible");
};

export default AdminPage;
