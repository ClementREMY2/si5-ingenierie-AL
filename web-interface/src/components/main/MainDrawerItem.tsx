import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ReactNode} from "react";
import {To, useMatch, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/Auth.tsx";
import {UserRole} from "../../interfaces/User.ts";
import WithTooltipGeneric from "../generics/WithTooltipGeneric.tsx";

interface DrawerItemProps {
    open?: boolean;
    icon: ReactNode;
    title: string;
    to: To;
    roles?: UserRole[];
}

export default function MainDrawerItem({open, icon, title, to, roles}: Readonly<DrawerItemProps>) {
    const navigate = useNavigate();
    const active = !!useMatch(to.toString());
    const {user} = useAuth();

    if (roles && user && !roles.includes(user.role)) {
        return null;
    }

    return (
        <ListItem disablePadding>
            <ListItemButton selected={active} onClick={() => navigate(to)}>
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