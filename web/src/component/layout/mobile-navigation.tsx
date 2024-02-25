"use client";

import { Menu } from "@mui/icons-material";
import { Box, BoxProps, Drawer, IconButton, IconButtonProps } from "@mui/material";
import { ReactNode, useState } from "react";

interface MobileNavigationProps {
    children?: ReactNode;
    boxProps?: BoxProps;
    iconButtonProps?: Omit<IconButtonProps, "onClick">;
}

/**
 * Rendert einen Menü-Button, welcher bei Klick einen Drawer öffnet.
 */
export const MobileNavigation = ({ children, boxProps, iconButtonProps }: MobileNavigationProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <IconButton onClick={() => setOpen(true)} {...iconButtonProps}>
                <Menu />
            </IconButton>

            <Drawer open={open} onClose={() => setOpen(false)}>
                <Box width={300} {...boxProps}>
                    {children}
                </Box>
            </Drawer>
        </>
    );
};
