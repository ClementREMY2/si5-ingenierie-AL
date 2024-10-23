import {Delete, Edit, Visibility} from "@mui/icons-material";
import {IconButton, Stack, TableCell, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {generatePath, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import ListPageGeneric from "../../components/generics/ListPageGeneric.tsx";
import {TableHeadCell} from "../../interfaces/Generics.ts";
import {Doctor} from "../../interfaces/model/User.ts";
import {getDoctors} from "../../services/DoctorService.ts";
import {getUserName} from "../../services/UserService.ts";
import {privateFullRoutes} from "../../utils/Routes.ts";

export default function DoctorListPage() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        setDoctors(getDoctors);
    }, []);

    const handleView = (id: number) => navigate(generatePath(privateFullRoutes.doctors.view, {id}));
    const handleEdit = (id: number) => navigate(generatePath(privateFullRoutes.doctors.edit, {id}));
    const handleDelete = (id: number) => toast.success(`Doctor ${id} deleted`);

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
            id: "specialty",
            content: "Specialty"
        },
        {
            id: "actions",
            content: "Actions"
        }
    ];

    const renderTableRow = (row: Doctor) => (
        <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{getUserName(row)}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>{row.specialty}</TableCell>
            <TableCell><Stack direction={"row"} spacing={1}>
                <IconButton color={"success"} onClick={() => handleView(row.id)}><Visibility/></IconButton>
                <IconButton color={"info"} onClick={() => handleEdit(row.id)}><Edit/></IconButton>
                <IconButton color={"error"} onClick={() => handleDelete(row.id)}><Delete/></IconButton>
            </Stack></TableCell>
        </TableRow>
    );

    return <ListPageGeneric
        title={"Doctor list page"}
        addLabel={"Add doctor"}
        addRoute={privateFullRoutes.doctors.create}
        tableHeadCells={tableHeadCells} rows={doctors} renderTableRow={renderTableRow}
    />;
}