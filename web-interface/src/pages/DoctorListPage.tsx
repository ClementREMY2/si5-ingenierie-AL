import {Delete, Edit, Visibility} from "@mui/icons-material";
import {IconButton, Stack, TableCell, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {generatePath, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import ListPageGeneric from "../components/generics/ListPageGeneric.tsx";
import {TableHeadCell} from "../interfaces/Generics.ts";
import {Doctor, UserRole} from "../interfaces/User.ts";
import {getUsersWithRole} from "../services/UserService.ts";
import {privateRoutes} from "../utils/Routes.ts";

export default function DoctorListPage() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        setDoctors(getUsersWithRole(UserRole.DOCTOR) as Doctor[]);
    }, []);

    const handleView = () => navigate(generatePath(privateRoutes.doctors.base, {"*": privateRoutes.doctors.view}));
    const handleEdit = () => navigate(generatePath(privateRoutes.doctors.base, {"*": privateRoutes.doctors.edit}));
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
            <TableCell>{row.firstName} {row.lastName}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>{row.specialty}</TableCell>
            <TableCell><Stack direction={"row"} spacing={1}>
                <IconButton color={"success"} onClick={handleView}><Visibility/></IconButton>
                <IconButton color={"info"} onClick={handleEdit}><Edit/></IconButton>
                <IconButton color={"error"} onClick={() => handleDelete(row.id)}><Delete/></IconButton>
            </Stack></TableCell>
        </TableRow>
    );

    return <ListPageGeneric
        title={"Doctor list page"}
        addLabel={"Add doctor"}
        addRoute={generatePath(privateRoutes.doctors.base, {"*": privateRoutes.doctors.create})}
        tableHeadCells={tableHeadCells} rows={doctors} renderTableRow={renderTableRow}
    />;
}