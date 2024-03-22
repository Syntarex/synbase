import "server-only";

import { getMe } from "@/data/profile";
import { BlogPostValidation } from "@/model/validation";
import { auth0 } from "@/util/server/auth0";
import Database, { Prisma } from "@synbase/database";
import { StatusCodes } from "http-status-codes";
import { AppConfigDynamic } from "next/dist/build/utils";
import { NextRequest, NextResponse } from "next/server";

export const dynamic: AppConfigDynamic = "force-dynamic";

export const GET = async () => {
    const blogPosts = await Database.blogPost.findMany();

    return Response.json(blogPosts);
};

export const POST = auth0.withApiAuthRequired(async (req: NextRequest) => {
    const profile = await getMe();

    const data: Prisma.BlogPostCreateWithoutAuthorInput = await req.json();

    const isValid = await BlogPostValidation.isValid(data);

    if (!isValid) {
        return new NextResponse(null, { status: StatusCodes.BAD_REQUEST });
    }

    const blogPost = await Database.blogPost.create({
        data: { ...data, authorId: profile.id },
    });

    return NextResponse.json(blogPost, {
        status: StatusCodes.CREATED,
    });
});
