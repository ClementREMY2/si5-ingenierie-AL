import {Dashboard} from "@mui/icons-material";
import {Divider, Drawer, List, SxProps, Toolbar} from "@mui/material";
import MainDrawerItem from "./MainDrawerItem.tsx";

interface DrawerProps {
    open?: boolean;
}

export default function MainDrawer({open}: Readonly<DrawerProps>) {
    const drawerSx: SxProps = {
        width: open ? 175 : 60,
        "& .MuiDrawer-paper": {
            width: open ? 175 : 60
        }
    };

    return (
        <Drawer variant={"permanent"} sx={drawerSx}>
            <Toolbar/>
            <Divider/>
            <List>
                <MainDrawerItem icon={<Dashboard/>} title={"Dashboard"} open={open}/>
                <MainDrawerItem icon={<Dashboard/>} title={"Dashboard"} open={open}/>
                <MainDrawerItem icon={<Dashboard/>} title={"Dashboard"} open={open}/>
            </List>
            <Divider/>
            <List>
                <MainDrawerItem icon={<Dashboard/>} title={"Dashboard"} open={open}/>
                <MainDrawerItem icon={<Dashboard/>} title={"Dashboard"} open={open}/>
                <MainDrawerItem icon={<Dashboard/>} title={"Dashboard"} open={open}/>
            </List>
        </Drawer>
    );
}