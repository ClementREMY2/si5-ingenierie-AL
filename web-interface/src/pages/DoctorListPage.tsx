import {Add} from "@mui/icons-material";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {User, UserRole} from "../interfaces/User.ts";
import {getUsersWithRole} from "../services/UserService.ts";

export default function DoctorListPage() {
    const [doctors, setDoctors] = useState<User[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    useEffect(() => {
        setDoctors(getUsersWithRole(UserRole.DOCTOR));
    }, []);

    const visibleRows = useMemo(() => (
        doctors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    ), [doctors, page, rowsPerPage]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const newDoctorButton = (
        <Button variant={"contained"} startIcon={<Add/>}>Add doctor</Button>
    );

    return (
        <Card sx={{m: 2}}>
            <CardHeader title={"Doctor list page"} action={newDoctorButton}/>
            <CardContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>N°</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone number</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.firstName} {row.lastName}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>Edit / Delete</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component={"div"}
                    count={doctors.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </CardContent>
        </Card>
    );
}