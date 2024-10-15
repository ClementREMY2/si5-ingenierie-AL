import {Dashboard, Elderly, MedicalServices} from "@mui/icons-material";
import {Divider, Drawer, List, SxProps, Toolbar} from "@mui/material";
import {UserRole} from "../../interfaces/User.ts";
import {privateRoutes} from "../../utils/Routes.ts";
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
                    to={privateRoutes.dashboard}
                    open={open}/>
                <MainDrawerItem
                    title={"Doctor list"}
                    icon={<MedicalServices/>}
                    to={privateRoutes.doctorList}
                    roles={[UserRole.ADMIN]}
                    open={open}/>
                <MainDrawerItem
                    title={"Patient list"}
                    icon={<Elderly/>}
                    to={privateRoutes.patientList}
                    roles={[UserRole.DOCTOR]}
                    open={open}/>
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