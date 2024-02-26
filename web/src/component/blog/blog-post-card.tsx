import "server-only";

import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, SxProps, Typography } from "@mui/material";
import { BlogPost } from "@synbase/database";
import dayjs from "dayjs";
import Image from "next/image";

interface BlogPostCardProps {
    sx?: SxProps;
    value: BlogPost;
}

/**
 * Zeigt eine Vorschau eines BlogPosts.
 */
export const BlogPostCard = ({ sx, value }: BlogPostCardProps) => {
    const { createdAt, description, slug, title, updatedAt } = value;

    return (
        <Card sx={sx}>
            <CardHeader title={title} subheader={description} />

            <CardMedia sx={{ "& > img": { width: "100%", height: "auto" } }}>
                <Image src={"/placeholder.png"} alt={title} width={1600} height={900} />
            </CardMedia>

            <CardContent>
                <Typography variant={"body2"}>
                    {dayjs(updatedAt).isAfter(createdAt) ? "Update am:" : "Erstellt am:"}
                    {dayjs(updatedAt).format("DD.MM.YYYY HH:mm")}
                </Typography>
            </CardContent>

            <CardActions>
                <Button href={`/blog/${slug}`} size={"small"}>
                    Lesen
                </Button>
            </CardActions>
        </Card>
    );
};
