import {TableCell, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {generatePath} from "react-router-dom";
import ListPageGeneric from "../components/generics/ListPageGeneric.tsx";
import {TableHeadCell} from "../interfaces/Generics.ts";
import {Doctor, UserRole} from "../interfaces/User.ts";
import {getUsersWithRole} from "../services/UserService.ts";
import {privateRoutes} from "../utils/Routes.ts";

export default function DoctorListPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        setDoctors(getUsersWithRole(UserRole.DOCTOR) as Doctor[]);
    }, []);

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
            <TableCell>Edit / Delete</TableCell>
        </TableRow>
    );

    return <ListPageGeneric
        title={"Doctor list page"}
        addLabel={"Add doctor"}
        addRoute={generatePath(privateRoutes.doctors.base, {"*": privateRoutes.doctors.create})}
        tableHeadCells={tableHeadCells} rows={doctors} renderTableRow={renderTableRow}
    />;
}