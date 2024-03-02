import Database from "@synbase/database";
import { AppConfigDynamic } from "next/dist/build/utils";
import { NextResponse } from "next/server";

export const dynamic: AppConfigDynamic = "force-dynamic";

export const GET = async () => {
    const profiles = await Database.profile.findMany();

    return NextResponse.json(profiles);
};
