import "server-only";

import { orbitron } from "@/style/font";
import { Menu } from "@mui/icons-material";
import {
    Box,
    Container,
    IconButton,
    Link,
    AppBar as MuiAppBar,
    AppBarProps as MuiAppBarProps,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import { Avatar } from "../auth/avatar";
import { Loading } from "../common/loading";
import { Logo } from "../common/logo";
import { DiscordButton } from "../social/discord-button";
import { Navigation } from "./navigation";

export const AppBar = (props: MuiAppBarProps) => {
    return (
        <MuiAppBar position={"static"} {...props}>
            <Container maxWidth={"xl"}>
                <Toolbar disableGutters>
                    <Stack
                        width={"100%"}
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        gap={2}
                    >
                        <IconButton sx={{ display: { md: "none" } }}>
                            <Menu />
                        </IconButton>

                        <Link href={"/"} color={"text.primary"} underline={"none"}>
                            <Stack direction={"row"} alignItems={"center"} gap={2}>
                                <Logo size={32} boxProps={{ sx: { display: { xs: "none", md: "block" } } }} />

                                <Typography variant={"h4"} fontFamily={orbitron.style.fontFamily} fontWeight={600}>
                                    Synbase
                                </Typography>
                            </Stack>
                        </Link>

                        <Navigation sx={{ display: { xs: "none", md: "flex" } }} />

                        <Box>
                            <Loading>
                                <Avatar
                                    href={"/api/auth/logout"}
                                    avatarProps={{
                                        sx: {
                                            cursor: "pointer",
                                        },
                                    }}
                                    renderOnUnauthenticated={
                                        <DiscordButton
                                            sx={{ color: "white" }}
                                            href={"/api/auth/login"}
                                            variant={"text"}
                                            size={"small"}
                                            color={"primary"}
                                        >
                                            Einloggen
                                        </DiscordButton>
                                    }
                                />
                            </Loading>
                        </Box>
                    </Stack>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
};
