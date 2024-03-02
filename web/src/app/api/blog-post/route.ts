import auth0 from "@/util/auth0";
import Database from "@synbase/database";
import { StatusCodes } from "http-status-codes";
import { AppConfigDynamic } from "next/dist/build/utils";
import { NextRequest, NextResponse } from "next/server";

export const dynamic: AppConfigDynamic = "force-dynamic";

export const GET = async () => {
    const blogPosts = await Database.blogPost.findMany();

    return Response.json(blogPosts);
};

export const POST = auth0.withApiAuthRequired(async (req: NextRequest) => {
    const data = await req.json();

    const blogPost = await Database.blogPost.create({ data });

    return NextResponse.json(blogPost, {
        status: StatusCodes.CREATED,
    });
});
