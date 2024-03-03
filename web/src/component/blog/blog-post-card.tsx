import "server-only";

import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Link,
    Stack,
    SxProps,
    Typography,
} from "@mui/material";
import { BlogPost } from "@synbase/database";
import dayjs from "dayjs";
import Image from "next/image";
import { ReactNode } from "react";

interface BlogPostCardProps {
    sx?: SxProps;
    value: BlogPost;
    actions?: ReactNode;
}

/**
 * Zeigt eine Vorschau eines BlogPosts.
 */
export const BlogPostCard = ({ sx, value, actions }: BlogPostCardProps) => {
    const { description, slug, title, updatedAt } = value;

    return (
        <Link sx={{ textDecoration: "none" }} href={`/blog/${slug}`}>
            <Stack
                sx={{
                    "&:hover": { outlineColor: "primary.main", outlineStyle: "solid", outlineWidth: 2 },
                    ...sx,
                }}
                component={Card}
                alignItems={"center"}
            >
                <CardHeader sx={{ flexGrow: 1 }} title={title} subheader={description} />

                <CardMedia sx={{ "& > img": { width: "100%", height: "auto" } }}>
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

                {actions && <CardActions>{actions}</CardActions>}
            </Stack>
        </Link>
    );
};
