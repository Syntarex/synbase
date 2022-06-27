import { Menu } from "@mui/icons-material";
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { URLS } from "../../constants/constants.client";
import Link from "../common/link/link.component";
import ErrorList from "../error/error-list/error-list.component";
import Breadcrumb from "./breadcrumb/breadcrumb.component";
import DrawerMenu from "./drawer-menu/drawer-menu.component";
import Logo from "./logo/logo.component";

const drawerWidth = 240;

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout = (props: ILayoutProps) => {
    const { children } = props;

    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const toggleMobileOpen = React.useCallback(() => setMobileOpen(!mobileOpen), [mobileOpen]);

    const desktop = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position={"fixed"}
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    marginLeft: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar variant={desktop ? "regular" : "dense"} sx={{ justifyContent: "center" }}>
                    <IconButton
                        edge={"start"}
                        onClick={toggleMobileOpen}
                        sx={{ position: "absolute", left: theme.spacing(2), display: { sm: "none" } }}
                    >
                        <Menu />
                    </IconButton>

                    <Link
                        sx={{
                            display: { xs: "flex", sm: "none" },
                            justifyContent: "center",
                            alignItems: "center",
                            flexGrow: 1,
                        }}
                        href={URLS.HOME}
                    >
                        <Logo width={26} height={26} />

                        <Typography
                            component={"h1"}
                            variant={"h6"}
                            sx={{
                                color: theme.palette.text.primary,
                                marginLeft: theme.spacing(2),
                            }}
                        >
                            Synbase
                        </Typography>
                    </Link>

                    <Breadcrumb
                        sx={{
                            display: { xs: "none", sm: "flex" },
                            flexGrow: 1,
                            paddingRight: theme.spacing(2),
                        }}
                    />
                </Toolbar>
            </AppBar>

            <Box sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                {desktop ? (
                    <Drawer open variant={"permanent"}>
                        <DrawerMenu sx={{ width: drawerWidth }} />
                    </Drawer>
                ) : (
                    <Drawer
                        variant={"temporary"}
                        open={mobileOpen}
                        onClose={toggleMobileOpen}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <DrawerMenu sx={{ width: drawerWidth }} />
                    </Drawer>
                )}
            </Box>

            <Box
                component={"main"}
                sx={{
                    padding: theme.spacing(4),
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Box sx={theme.mixins.toolbar} />

                <Breadcrumb
                    sx={{
                        display: { sm: "none" },
                        marginBottom: theme.spacing(4),
                    }}
                />

                <ErrorList
                    sx={{
                        marginBottom: theme.spacing(4),
                    }}
                />

                {children}
            </Box>
        </Box>
    );
};

export default Layout;
