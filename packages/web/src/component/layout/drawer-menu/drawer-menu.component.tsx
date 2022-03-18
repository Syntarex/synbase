import { Theme } from "@emotion/react";
import InboxIcon from "@mui/icons-material/Inbox";
import { SxProps, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Urls } from "../../../constants/constants.client";
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
                    <Link sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} href={Urls.Home}>
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
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Blub"}></ListItemText>
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Blub"}></ListItemText>
                </ListItem>
            </List>
        </Box>
    );
};

export default DrawerMenu;
