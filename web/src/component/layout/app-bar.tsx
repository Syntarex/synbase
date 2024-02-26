import "server-only";

import { orbitron } from "@/style/font";
import {
    Box,
    Container,
    Link,
    AppBar as MuiAppBar,
    AppBarProps as MuiAppBarProps,
    Skeleton,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { AuthRender } from "../auth/auth-render";
import { Avatar } from "../auth/avatar";
import { Loading } from "../common/loading";
import { Logo } from "../common/logo";
import { DiscordButton } from "../social/discord-button";
import { MobileNavigation } from "./mobile-navigation";
import { Navigation } from "./navigation";

export const AppBar = (props: MuiAppBarProps) => {
    return (
        <MuiAppBar position={"static"} {...props}>
            <Container maxWidth={"xl"}>
                <Toolbar disableGutters>
                    <Stack width={"100%"} direction={"row"} alignItems={"center"} gap={4}>
                        <MobileNavigation boxProps={{ p: 4 }} iconButtonProps={{ sx: { display: { md: "none" } } }}>
                            <Navigation direction={"column"} spacing={4} />
                        </MobileNavigation>

                        <Box sx={{ width: { xs: "100%", md: "unset" } }}>
                            <Link href={"/"} color={"text.primary"} underline={"none"}>
                                <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={2}>
                                    <Logo size={32} boxProps={{ sx: { display: { xs: "none", md: "block" } } }} />

                                    <Typography variant={"h4"} fontFamily={orbitron.style.fontFamily} fontWeight={600}>
                                        Synbase
                                    </Typography>
                                </Stack>
                            </Link>
                        </Box>

                        <Navigation sx={{ display: { xs: "none", md: "flex" }, width: "100%" }} />

                        <Box>
                            <Loading>
                                {/* Wir verwenden hier einen <a>-Tag, damit Next.js die Route nicht prefetched  */}
                                <AuthRender
                                    renderOnUnauthenticated={
                                        <a href={"/api/auth/login"}>
                                            <DiscordButton
                                                sx={{ color: "white" }}
                                                href={undefined}
                                                variant={"text"}
                                                size={"small"}
                                                color={"primary"}
                                            >
                                                Einloggen
                                            </DiscordButton>
                                        </a>
                                    }
                                    renderOnLoading={<Skeleton variant={"circular"} width={40} height={40} />}
                                >
                                    <Tooltip title={"Klicke um dich auszuloggen."}>
                                        <a href={"/api/auth/logout"}>
                                            <Avatar />
                                        </a>
                                    </Tooltip>
                                </AuthRender>
                            </Loading>
                        </Box>
                    </Stack>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
};
