import {TableCell, TableHead, TableRow} from "@mui/material";
import {TableHeadCell} from "../../../interfaces/Generics.ts";

interface TableHeadGenericProps {
    headCells: TableHeadCell[];
}

export default function TableHeadGeneric({headCells}: Readonly<TableHeadGenericProps>) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map(cell => (
                    <TableCell key={cell.id} width={cell.width}>{cell.content}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}