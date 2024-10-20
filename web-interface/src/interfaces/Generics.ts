import {ReactNode} from "react";

export interface TableHeadCell {
    id: string;
    content: ReactNode;
    width?: number | string;
}