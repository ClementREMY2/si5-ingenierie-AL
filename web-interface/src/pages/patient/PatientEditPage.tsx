import {Card, CardContent, CardHeader, Grid2, MenuItem, Stack, TextField} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import {generatePath, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import EditActionsGeneric from "../../components/generics/editPage/EditActionsGeneric.tsx";
import EditViewGeneric from "../../components/generics/editPage/EditViewGeneric.tsx";
import {Patient} from "../../interfaces/User.ts";
import {emptyPatient} from "../../mocks/User.ts";
import {getDoctorById, getDoctors} from "../../services/DoctorService.ts";
import {getPatientById} from "../../services/PatientService.ts";
import {getUserName} from "../../services/UserService.ts";
import {privateFullRoutes} from "../../utils/Routes.ts";

interface PatientEditPageProps {
    edit?: boolean;
}

export default function PatientEditPage({edit}: Readonly<PatientEditPageProps>) {
    const navigate = useNavigate();
    const {id} = useParams();
    const [patient, setPatient] = useState<Patient>(emptyPatient);

    useEffect(() => {
        if (id) {
            const patient = getPatientById(parseInt(id, 10));
            if (!patient) {
                toast.error("Patient not found");
                handleCancel();
                return;
            }
            setPatient(patient);
        }
    }, [id]);

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        const newValue = name === "doctor" ? getDoctorById(parseInt(value, 10)) : value;
        setPatient(prevState => ({...prevState, [name]: newValue}));
    };

    const handleCancel = () => {
        navigate(privateFullRoutes.patients.list);
    };

    const handleSubmit = () => {
        // Send the patient to backend
        toast.success("Patient successfully submitted");
        console.log("Patient:", patient);
        navigate(privateFullRoutes.patients.list);
    };

    const handleEdit = () => {
        navigate(generatePath(privateFullRoutes.patients.edit, {id}));
    };

    const title = () => {
        if (!edit) return "View patient";
        if (id) return "Edit patient";
        return "New patient";
    };

    return (
        <Card sx={{m: 2}}>
            <CardHeader title={title()}/>
            <CardContent>
                <Stack spacing={3}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{xs: 12, md: 6, xl: 4}}>
                            <EditViewGeneric edit={edit} viewText={`Firstname: ${patient.firstname}`}>
                                <TextField label={"Firstname"} name={"firstname"} value={patient.firstname}
                                           onChange={onChange} fullWidth/>
                            </EditViewGeneric>
                        </Grid2>
                        <Grid2 size={{xs: 12, md: 6, xl: 4}}>
                            <EditViewGeneric edit={edit} viewText={`Lastname: ${patient.lastname}`}>
                                <TextField label={"Lastname"} name={"lastname"} value={patient.lastname}
                                           onChange={onChange} fullWidth/>
                            </EditViewGeneric>
                        </Grid2>
                        <Grid2 size={{xs: 12, md: 6, xl: 4}}>
                            <EditViewGeneric edit={edit} viewText={`Email: ${patient.email}`}>
                                <TextField label={"Email"} name={"email"} value={patient.email} onChange={onChange}
                                           fullWidth/>
                            </EditViewGeneric>
                        </Grid2>
                        <Grid2 size={{xs: 12, md: 6, xl: 4}}>
                            <EditViewGeneric edit={edit} viewText={`Phone number: ${patient.phone}`}>
                                <TextField label={"Phone number"} name={"phone"} value={patient.phone}
                                           onChange={onChange} fullWidth/>
                            </EditViewGeneric>
                        </Grid2>
                        <Grid2 size={{xs: 12, md: 6, xl: 4}}>
                            <EditViewGeneric edit={edit} viewText={`Doctor: ${getUserName(patient.doctor, "None")}`}>
                                <TextField label={"Doctor"} name={"doctor"} value={patient.doctor?.id}
                                           select type={"search"} onChange={onChange} fullWidth>
                                    {getDoctors().map((doctor) => (
                                        <MenuItem key={doctor.id} value={doctor.id}>
                                            {getUserName(doctor)}
                                        </MenuItem>
                                    ))}
                                </TextField>
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