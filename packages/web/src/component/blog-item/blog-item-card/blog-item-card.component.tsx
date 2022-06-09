import { SxProps, Theme } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { IBlogItem, IProfile } from "@synbase/shared";
import dayjs from "dayjs";
import React from "react";

interface IBlogItemCardProps {
    sx?: SxProps<Theme>;
    blogItem: IBlogItem;
    author: IProfile;
}

const BlogItemCard = (props: IBlogItemCardProps) => {
    const { sx, blogItem, author } = props;

    const { title, created, summary } = blogItem;
    const { nickname } = author;

    const date = React.useMemo(() => dayjs(created).format("DD. MMMM YYYY"), [created]);

    return (
        <Card sx={sx} variant={"outlined"}>
            <CardHeader title={title} titleTypographyProps={{ variant: "h5", component: "h2" }} />

            <Divider />

            <CardContent>
                <Typography gutterBottom>{summary}</Typography>

                <Typography variant={"body2"}>
                    von {nickname}, am {date}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BlogItemCard;
