import {Add} from "@mui/icons-material";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import {useNavigate} from "react-router-dom";
import TableGeneric, {TableGenericProps} from "./table/TableGeneric.tsx";

interface ListPageGenericProps<T> extends TableGenericProps<T> {
    title: string;
    addLabel?: string;
    addRoute: string;
}

export default function ListPageGeneric<T>({
    title,
    addLabel,
    addRoute,
    ...tableProps
}: Readonly<ListPageGenericProps<T>>) {
    const navigate = useNavigate();

    const addButton = (
        <Button variant={"contained"} startIcon={<Add/>} onClick={() => navigate(addRoute)}>
            {addLabel ?? addRoute}
        </Button>
    );

    return (
        <Card sx={{m: 2}}>
            <CardHeader title={title} action={addRoute && addButton}/>
            <CardContent>
                <TableGeneric {...tableProps}/>
            </CardContent>
        </Card>
    );
}