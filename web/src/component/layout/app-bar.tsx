import "server-only";

import { orbitron } from "@/style/font";
import { Box, Container, Link, AppBar as MuiAppBar, Stack, Toolbar, Typography } from "@mui/material";
import { Avatar } from "../auth/avatar";
import { Logo } from "../common/logo";
import { Navigation } from "./navigation";

export const AppBar = () => {
    return (
        <MuiAppBar position={"static"}>
            <Container maxWidth={"xl"}>
                <Toolbar disableGutters>
                    <Stack width={"100%"} direction={"row"} alignItems={"center"} gap={6}>
                        <Link href={"/"} color={"text.primary"} underline={"none"}>
                            <Stack direction={"row"} alignItems={"center"} gap={2}>
                                <Logo size={32} />

                                <Typography variant={"h4"} fontFamily={orbitron.style.fontFamily} fontWeight={600}>
                                    Synbase
                                </Typography>
                            </Stack>
                        </Link>

                        <Navigation sx={{ width: "100%", flexGrow: 1 }} />

                        <Box>
                            <Avatar />
                        </Box>
                    </Stack>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
};
