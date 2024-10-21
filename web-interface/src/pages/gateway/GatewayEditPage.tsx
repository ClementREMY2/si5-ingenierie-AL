import {Card, CardContent, CardHeader, Grid2, Stack, TextField, Checkbox, FormControlLabel, Typography} from "@mui/material";
import {ChangeEvent, useEffect, useState, useCallback} from "react";
import {generatePath, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import EditActionsGeneric from "../../components/generics/editPage/EditActionsGeneric.tsx";
import EditViewGeneric from "../../components/generics/editPage/EditViewGeneric.tsx";
import {Gateway} from "../../interfaces/Device.ts";
import {emptyGateway} from "../../mocks/Device.ts";
import {getGatewayById} from "../../services/GatewayService.tsx";
import {privateFullRoutes} from "../../utils/Routes.ts";

interface GatewayEditPageProps {
    edit?: boolean;
}

export default function GatewayEditPage({edit}: Readonly<GatewayEditPageProps>) {
    const navigate = useNavigate();
    const {id} = useParams();
    const [gateway, setGateway] = useState<Gateway>(emptyGateway);

    const handleCancel = useCallback(() => {
        navigate(privateFullRoutes.gateways.list);
    }, [navigate]);

    useEffect(() => {
        if (id) {
            const gateway = getGatewayById(parseInt(id, 10));
            if (!gateway) {
                toast.error("Gateway not found");
                handleCancel();
                return;
            }
            setGateway(gateway);
        }
    }, [id, handleCancel]);

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setGateway(prevState => ({...prevState, [name]: value}));
    };

    const handleSubmit = () => {
        // Send the gateway to backend
        toast.success("Gateway successfully submitted");
        console.log("Gateway:", gateway);
        navigate(privateFullRoutes.gateways.list);
    };

    const handleEdit = () => {
        navigate(generatePath(privateFullRoutes.gateways.edit, {id}));
    };

    const title = () => {
        if (!edit) return "View gateway";
        if (id) return "Edit gateway";
        return "New gateway";
    };

    return (
        <Card sx={{m: 2}}>
            <CardHeader title={title()}/>
            <CardContent>
                <Stack spacing={3}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{xs: 12, md: 6, xl: 4}}>
                            <EditViewGeneric edit={edit} viewText={`Name: ${gateway.name}`}>
                                <TextField label={"Name"} name={"name"} value={gateway.name}
                                           onChange={onChange} fullWidth/>
                            </EditViewGeneric>
                        </Grid2>

                        <Grid2 size={{xs: 12 }}>
                            <Typography variant="h6">Paramètres</Typography>
                            <Grid2 container spacing={2}>
                                <Grid2 size={{xs: 12, md: 6, xl: 4}}>
                                    <EditViewGeneric edit={edit} viewText={`Reatime enabled: ${gateway.realtimeEnabled}`}>
                                        <FormControlLabel
                                            control={
                                            <Checkbox
                                                checked={gateway.realtimeEnabled}
                                                onChange={onChange}
                                                name="realtimeEnabled"
                                                color="primary"
                                            />
                                            }
                                            label="Realtime"
                                        />
                                    </EditViewGeneric>
                                </Grid2>
                            </Grid2>
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