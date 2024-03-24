import "server-only";

import { Avatar, Card, CardContent, CardHeader, CardMedia, CardProps, Stack, Typography } from "@mui/material";
import { BlogPost } from "@synbase/database";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { ResponsiveImage } from "../common/responsive-image";

interface BlogPostCardProps {
    value: BlogPost;
    slots?: {
        cardActions?: ReactNode;
    };
    cardProps?: CardProps;
}

/**
 * Zeigt eine Vorschau eines BlogPosts.
 */
export const BlogPostCard = ({ value, slots = {}, cardProps }: BlogPostCardProps) => {
    const { description, title, updatedAt } = value;

    return (
        <Stack component={Card} {...cardProps}>
            <CardHeader sx={{ flexGrow: 1 }} title={title} subheader={description} />

            <CardMedia>
                {/* TODO: blog-Post Bild */}
                <ResponsiveImage src={"/placeholder.png"} alt={title} width={900} height={900} />
            </CardMedia>

            <Stack component={CardContent} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography variant={"body2"}>{dayjs(updatedAt).format("DD. MMMM YYYY")}</Typography>

                <Stack direction={"row"} alignItems={"center"} gap={0.5}>
                    <Avatar sx={{ width: 24, height: 24 }} src={"/heart.png"} />

                    <Typography variant={"body2"} fontWeight={600}>
                        Syntarex
                    </Typography>
                </Stack>
            </Stack>

            {slots.cardActions}
        </Stack>
    );
};
