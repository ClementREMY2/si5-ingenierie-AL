import {Card, CardContent, CardHeader, Grid2, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {generatePath, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import EditActionsGeneric from "../../components/generics/editPage/EditActionsGeneric.tsx";
import EditViewGeneric from "../../components/generics/editPage/EditViewGeneric.tsx";
import {Doctor} from "../../interfaces/User.ts";
import {emptyDoctor} from "../../mocks/User.ts";
import {getDoctorById} from "../../services/DoctorService.tsx";
import {privateFullRoutes} from "../../utils/Routes.ts";

interface DoctorEditPageProps {
    edit?: boolean;
}

export default function DoctorEditPage({edit}: Readonly<DoctorEditPageProps>) {
    const navigate = useNavigate();
    const {id} = useParams();
    const [doctor, setDoctor] = useState<Doctor>(emptyDoctor);

    useEffect(() => {
        if (id) {
            setDoctor(getDoctorById(parseInt(id, 10)));
        }
    }, [id]);

    const title = () => {
        if (!edit) return "View doctor";
        if (id) return "Edit doctor";
        return "New doctor";
    };

    const handleCancel = () => {
        navigate(privateFullRoutes.doctors.list);
    };

    const handleSubmit = () => {
        toast.success("Doctor successfully submitted");
        navigate(privateFullRoutes.doctors.list);
    };

    const handleEdit = () => {
        navigate(generatePath(privateFullRoutes.doctors.edit, {id}));
    };

    return (
        <Card sx={{m: 2}}>
            <CardHeader title={title()}/>
            <CardContent>
                <Stack spacing={3}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{xs: 12, md: 6, xl: 4}}>
                            <EditViewGeneric edit={edit} viewText={`Firstname: ${doctor.firstname}`}>
                                <TextField label={"Firstname"} value={doctor.firstname} fullWidth/>
                            </EditViewGeneric>
                        </Grid2>
                        <Grid2 size={{xs: 12, md: 6, xl: 4}}>
                            <EditViewGeneric edit={edit} viewText={`Lastname: ${doctor.lastname}`}>
                                <TextField label={"Lastname"} value={doctor.lastname} fullWidth/>
                            </EditViewGeneric>
                        </Grid2>
                        <Grid2 size={{xs: 12, md: 6, xl: 4}}>
                            <EditViewGeneric edit={edit} viewText={`Email: ${doctor.email}`}>
                                <TextField label={"Email"} value={doctor.email} fullWidth/>
                            </EditViewGeneric>
                        </Grid2>
                        <Grid2 size={{xs: 12, md: 6, xl: 4}}>
                            <EditViewGeneric edit={edit} viewText={`Phone number: ${doctor.phone}`}>
                                <TextField label={"Phone number"} value={doctor.phone} fullWidth/>
                            </EditViewGeneric>
                        </Grid2>
                        <Grid2 size={{xs: 12, md: 6, xl: 4}}>
                            <EditViewGeneric edit={edit} viewText={`Specialty: ${doctor.specialty}`}>
                                <TextField label={"Specialty"} value={doctor.specialty} fullWidth/>
                            </EditViewGeneric>
                        </Grid2>
                    </Grid2>
                    <EditActionsGeneric
                        edit={edit}
                        handleEdit={handleEdit}
                        handleSubmit={handleSubmit}
                        handleCancel={handleCancel}/>
                </Stack>
            </CardContent>
        </Card>
    );
}