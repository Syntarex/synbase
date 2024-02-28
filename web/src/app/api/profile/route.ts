import Database from "@synbase/database";
import { AppConfigDynamic } from "next/dist/build/utils";

export const dynamic: AppConfigDynamic = "force-dynamic";

export const GET = async () => {
    const profiles = await Database.profile.findMany();

    return Response.json(profiles);
};
