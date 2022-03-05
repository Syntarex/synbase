import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

const Custom404Page = () => {
    return (
        <Container fixed>
            <Stack spacing={4} alignItems={"center"} justifyContent={"center"}>
                <Typography variant={"h1"}>404</Typography>
            </Stack>
        </Container>
    );
};

export default Custom404Page;
