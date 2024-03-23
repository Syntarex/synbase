import "server-only";

import { Avatar, Card, CardContent, CardHeader, CardMedia, CardProps, Link, Stack, Typography } from "@mui/material";
import { BlogPost } from "@synbase/database";
import dayjs from "dayjs";
import Image from "next/image";
import { ReactNode } from "react";

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
        <Link sx={{ textDecoration: "none" }} href={`/blog/${value.slug}`}>
            <Stack
                component={Card}
                {...cardProps}
                sx={{
                    "&:hover": { outlineColor: "primary.main", outlineStyle: "solid", outlineWidth: 2 },
                    ...cardProps?.sx,
                }}
            >
                <CardHeader sx={{ flexGrow: 1 }} title={title} subheader={description} />

                <CardMedia sx={{ "& > img": { width: "100%", height: "auto" } }}>
                    {/* TODO: blog-Post Bild */}
                    <Image src={"/placeholder.png"} alt={title} width={1600} height={900} />
                </CardMedia>

                <Stack
                    component={CardContent}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    width={"100%"}
                >
                    <Typography variant={"body2"}>{dayjs(updatedAt).format("DD. MMMM YYYY")}</Typography>

                    <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
                        <Avatar sx={{ width: 24, height: 24 }} src={"/heart.png"} />

                        <Typography variant={"body2"} fontWeight={600}>
                            Syntarex
                        </Typography>
                    </Stack>
                </Stack>

                {slots.cardActions}
            </Stack>
        </Link>
    );
};
