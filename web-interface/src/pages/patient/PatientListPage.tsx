import {Delete, Edit, Visibility} from "@mui/icons-material";
import {IconButton, Stack, TableCell, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {generatePath, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import ListPageGeneric from "../../components/generics/ListPageGeneric.tsx";
import {TableHeadCell} from "../../interfaces/Generics.ts";
import {Patient} from "../../interfaces/User.ts";
import {getPatients} from "../../services/PatientService.ts";
import {getUserName} from "../../services/UserService.ts";
import {privateFullRoutes} from "../../utils/Routes.ts";

export default function PatientListPage() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        setPatients(getPatients);
    }, []);

    const handleView = (id: number) => navigate(generatePath(privateFullRoutes.patients.view, {id}));
    const handleEdit = (id: number) => navigate(generatePath(privateFullRoutes.patients.edit, {id}));
    const handleDelete = (id: number) => toast.success(`Patient ${id} deleted`);

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
            id: "email",
            content: "Email"
        },
        {
            id: "phone",
            content: "Phone number"
        },
        {
            id: "doctor",
            content: "Doctor"
        },
        {
            id: "actions",
            content: "Actions"
        }
    ];

    const renderTableRow = (row: Patient) => (
        <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{getUserName(row)}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>{getUserName(row.doctor)}</TableCell>
            <TableCell><Stack direction={"row"} spacing={1}>
                <IconButton color={"success"} onClick={() => handleView(row.id)}><Visibility/></IconButton>
                <IconButton color={"info"} onClick={() => handleEdit(row.id)}><Edit/></IconButton>
                <IconButton color={"error"} onClick={() => handleDelete(row.id)}><Delete/></IconButton>
            </Stack></TableCell>
        </TableRow>
    );

    return <ListPageGeneric
        title={"Patient list page"}
        addLabel={"Add patient"}
        addRoute={privateFullRoutes.patients.create}
        tableHeadCells={tableHeadCells} rows={patients} renderTableRow={renderTableRow}
    />;
}