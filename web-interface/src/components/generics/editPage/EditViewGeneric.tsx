import {Typography} from "@mui/material";
import {ReactNode} from "react";

interface EditViewGenericProps {
    edit?: boolean;
    children: ReactNode;
    viewText: string;
}

export default function EditViewGeneric({edit, children, viewText}: Readonly<EditViewGenericProps>) {
    return edit ? children : <Typography>{viewText}</Typography>;
}