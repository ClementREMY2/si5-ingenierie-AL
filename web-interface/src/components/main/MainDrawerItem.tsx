import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ReactNode} from "react";
import WithTooltipGeneric from "../generics/WithTooltipGeneric.tsx";

interface DrawerItemProps {
    open?: boolean;
    icon: ReactNode;
    title: string;
}

export default function MainDrawerItem({open, icon, title}: Readonly<DrawerItemProps>) {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                {icon &&
                    <WithTooltipGeneric hasTooltip={!open} title={title} placement={"right"}>
                        <ListItemIcon sx={{minWidth: 0, justifyContent: "center"}}>{icon}</ListItemIcon>
                    </WithTooltipGeneric>
                }
                {open && <ListItemText sx={{my: -0.5, ml: 3}}>{title}</ListItemText>}
            </ListItemButton>
        </ListItem>
    );
}