import {Table, TableBody, TableContainer, TablePagination} from "@mui/material";
import {ChangeEvent, ReactElement, useMemo, useState} from "react";
import {TableHeadCell} from "../../../interfaces/Generics.ts";
import TableHeadGeneric from "./TableHeadGeneric.tsx";

export interface TableGenericProps<T> {
    tableHeadCells: TableHeadCell[];
    rows: T[];
    renderTableRow: (row: T) => ReactElement;
    pagination?: boolean;
    rowsPerPageOptions?: number[];
}

export default function TableGeneric<T>({
    tableHeadCells,
    rows,
    renderTableRow,
    pagination,
    rowsPerPageOptions = [5, 10, 25]
}: Readonly<TableGenericProps<T>>) {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const visibleRows = useMemo(() => (
        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    ), [rows, page, rowsPerPage]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (<>
        <TableContainer>
            <Table>
                <TableHeadGeneric headCells={tableHeadCells}/>
                <TableBody>
                    {visibleRows.map(row => renderTableRow(row))}
                </TableBody>
            </Table>
        </TableContainer>
        {pagination && <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component={"div"}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />}
    </>);
}