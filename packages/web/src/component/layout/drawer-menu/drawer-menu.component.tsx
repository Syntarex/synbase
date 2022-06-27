import { Theme } from "@emotion/react";
import { Inbox } from "@mui/icons-material";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    SxProps,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import { URLS } from "../../../constants/constants.client";
import Link from "../../common/link/link.component";
import Logo from "../logo/logo.component";

interface IDrawerMenuProps {
    sx?: SxProps<Theme>;
}

const DrawerMenu = (props: IDrawerMenuProps) => {
    const { sx } = props;

    const theme = useTheme();

    return (
        <Box component={"nav"} sx={sx}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Toolbar>
                    <Link sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} href={URLS.HOME}>
                        <Logo width={26} height={26} />

                        <Typography
                            component={"h1"}
                            variant={"h6"}
                            sx={{
                                display: { xs: "none", sm: "block" },
                                color: theme.palette.text.primary,
                                marginLeft: theme.spacing(2),
                            }}
                        >
                            Synbase
                        </Typography>
                    </Link>
                </Toolbar>
                <Divider />
            </Box>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <Inbox />
                    </ListItemIcon>
                    <ListItemText primary={"Blub"}></ListItemText>
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <Inbox />
                    </ListItemIcon>
                    <ListItemText primary={"Blub"}></ListItemText>
                </ListItem>
            </List>
        </Box>
    );
};

export default DrawerMenu;
