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
                <MainDrawerItem to={privateRoutes.dashboard} icon={<Dashboard/>} title={"Dashboard"} open={open}/>
                <MainDrawerItem to={privateRoutes.doctorList} icon={<MedicalServices/>} title={"Doctor list"}
                                open={open} roles={[UserRole.ADMIN]}/>
                <MainDrawerItem to={privateRoutes.patientList} icon={<Elderly/>} title={"Patient list"} open={open}
                                roles={[UserRole.DOCTOR]}/>
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