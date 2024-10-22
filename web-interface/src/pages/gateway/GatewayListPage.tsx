import {Delete, Edit, Visibility} from "@mui/icons-material";
import {IconButton, Stack, TableCell, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {generatePath, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import ListPageGeneric from "../../components/generics/ListPageGeneric.tsx";
import {Gateway} from "../../interfaces/Device.ts";
import {TableHeadCell} from "../../interfaces/Generics.ts";
import {getGateways} from "../../services/GatewayService.ts";
import {privateFullRoutes} from "../../utils/Routes.ts";

export default function GatewayListPage() {
    const navigate = useNavigate();
    const [gateways, setGateways] = useState<Gateway[]>([]);

    useEffect(() => {
        setGateways(getGateways);
    }, []);

    const handleView = (id: number) => navigate(generatePath(privateFullRoutes.gateways.view, {id}));
    const handleEdit = (id: number) => navigate(generatePath(privateFullRoutes.gateways.edit, {id}));
    const handleDelete = (id: number) => toast.success(`Gateway ${id} deleted`);

    const tableHeadCells: TableHeadCell[] = [
        {
            id: "id",
            content: "N°"
        },
        {
            id: "name",
            content: "Name"
        },
        {
            id: "realtimeEnabled",
            content: "Temps réel"
        },
        {
            id: "actions",
            content: "Actions"
        }
    ];

    const renderTableRow = (row: Gateway) => (
        <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.realtimeEnabled ? "Activé" : "Désactivé"}</TableCell>
            <TableCell><Stack direction={"row"} spacing={1}>
                <IconButton color={"success"} onClick={() => handleView(row.id)}><Visibility/></IconButton>
                <IconButton color={"info"} onClick={() => handleEdit(row.id)}><Edit/></IconButton>
                <IconButton color={"error"} onClick={() => handleDelete(row.id)}><Delete/></IconButton>
            </Stack></TableCell>
        </TableRow>
    );

    return <ListPageGeneric
        title={"Gateway list page"}
        addLabel={"Add gateway"}
        addRoute={privateFullRoutes.gateways.create}
        tableHeadCells={tableHeadCells} rows={gateways} renderTableRow={renderTableRow}
    />;
}