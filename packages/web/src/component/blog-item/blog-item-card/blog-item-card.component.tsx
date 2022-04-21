import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import { IBlogItem } from "@synbase/shared";
import React from "react";

interface IBlogItemCardProps {
    sx?: SxProps<Theme>;
    blogItem: IBlogItem;
}

const BlogItemCard = (props: IBlogItemCardProps) => {
    const { sx, blogItem } = props;

    return <Box sx={sx}>{JSON.stringify(blogItem)}</Box>;
};

export default BlogItemCard;
