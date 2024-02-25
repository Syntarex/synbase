import "server-only";

import { orbitron } from "@/style/font";
import { Container, Link, AppBar as MuiAppBar, Stack, Toolbar, Typography } from "@mui/material";
import { Logo } from "../common/logo";
import { Navigation } from "./navigation";

export const AppBar = () => {
    return (
        <MuiAppBar position={"static"}>
            <Container maxWidth={"xl"}>
                <Toolbar disableGutters>
                    <Stack direction={"row"} alignItems={"center"} gap={6}>
                        <Link href={"/"} color={"text.primary"} underline={"none"}>
                            <Stack direction={"row"} alignItems={"center"} gap={2}>
                                <Logo size={32} />

                                <Typography variant={"h4"} fontFamily={orbitron.style.fontFamily} fontWeight={600}>
                                    Synbase
                                </Typography>
                            </Stack>
                        </Link>

                        <Navigation sx={{ flexGrow: 1 }} />
                    </Stack>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
};
