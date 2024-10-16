import {TableCell, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {generatePath} from "react-router-dom";
import ListPageGeneric from "../components/generics/ListPageGeneric.tsx";
import {TableHeadCell} from "../interfaces/Generics.ts";
import {User, UserRole} from "../interfaces/User.ts";
import {getUsersWithRole} from "../services/UserService.ts";
import {privateRoutes} from "../utils/Routes.ts";

export default function DoctorListPage() {
    const [doctors, setDoctors] = useState<User[]>([]);

    useEffect(() => {
        setDoctors(getUsersWithRole(UserRole.DOCTOR));
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
            id: "actions",
            content: "Actions"
        }
    ];

    const renderTableRow = (row: User) => (
        <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.firstName} {row.lastName}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.phone}</TableCell>
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