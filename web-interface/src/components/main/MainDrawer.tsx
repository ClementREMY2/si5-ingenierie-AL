import {Dashboard, Elderly, MedicalServices, Router as RouterIcon} from "@mui/icons-material";
import {Divider, Drawer, List, SxProps, Toolbar} from "@mui/material";
import {UserRole} from "../../interfaces/model/User.ts";
import {privateFullRoutes} from "../../utils/Routes.ts";
import MainDrawerItem from "./MainDrawerItem.tsx";

interface DrawerProps {
    open?: boolean;
}

export default function MainDrawer({open}: Readonly<DrawerProps>) {
    const drawerSx: SxProps = {
        width: open ? 190 : 60,
        "& .MuiDrawer-paper": {
            width: open ? 190 : 60
        }
    };

    return (
        <Drawer variant={"permanent"} sx={drawerSx}>
            <Toolbar/>
            <Divider/>
            <List>
                <MainDrawerItem
                    title={"Dashboard"}
                    icon={<Dashboard/>}
                    to={privateFullRoutes.dashboard}
                    open={open}/>
                <MainDrawerItem
                    title={"Doctor list"}
                    icon={<MedicalServices/>}
                    to={privateFullRoutes.doctors.list}
                    roles={[UserRole.ADMIN]}
                    open={open}
                    baseRoute={privateFullRoutes.doctors.base}
                />
                <MainDrawerItem
                    title={"Gateway list"}
                    icon={<RouterIcon/>}
                    to={privateFullRoutes.gateways.list}
                    roles={[UserRole.ADMIN]}
                    open={open}
                    baseRoute={privateFullRoutes.gateways.base}
                />
                <MainDrawerItem
                    title={"Patient list"}
                    icon={<Elderly/>}
                    to={privateFullRoutes.patients.list}
                    roles={[UserRole.ADMIN]}
                    open={open}
                    baseRoute={privateFullRoutes.patients.base}/>
                {/*
                <MainDrawerItem to={privateRoutes.dashboard} icon={<ManageAccounts/>} title={"Manage users"}
                                open={open}/>
                <MainDrawerItem to={privateRoutes.dashboard} icon={<Healing/>} title={"Nurse list"} open={open}/>
                <MainDrawerItem to={privateRoutes.dashboard} icon={<FactCheck/>} title={"Form list"} open={open}/>
                <MainDrawerItem to={privateRoutes.dashboard} icon={<MedicalInformation/>} title={"Check-up list"}
                                open={open}/>
                <MainDrawerItem to={privateRoutes.dashboard} icon={<Analytics/>} title={"Data analytics"}
                                open={open}/>
                <MainDrawerItem to={privateRoutes.dashboard} icon={<MonitorHeart/>} title={"Devices"} open={open}/>
                <MainDrawerItem to={privateRoutes.dashboard} icon={<Contacts/>} title={"Contacts"} open={open}/>
                */}
            </List>
        </Drawer>
    );
}