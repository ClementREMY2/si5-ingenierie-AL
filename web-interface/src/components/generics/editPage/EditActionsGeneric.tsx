import {Edit, Save} from "@mui/icons-material";
import {Button, ButtonProps, Stack} from "@mui/material";

interface EditActionsGenericProps {
    edit?: boolean;
    handleSubmit: () => void;
    handleEdit: () => void;
    handleCancel: () => void;
}

const actionProps: ButtonProps = {
    variant: "contained",
    sx: {minWidth: 200}
};

export default function EditActionsGeneric({
    edit,
    handleEdit,
    handleSubmit,
    handleCancel
}: Readonly<EditActionsGenericProps>) {
    return (
        <Stack direction={"row"} spacing={2}>
            {edit
                ? <>
                    <Button color={"error"} onClick={handleCancel} {...actionProps}>Cancel</Button>
                    <Button onClick={handleSubmit} {...actionProps} startIcon={<Save/>}>Submit</Button>
                </>
                : <>
                    <Button color={"inherit"} onClick={handleCancel} {...actionProps}>Back</Button>
                    <Button onClick={handleEdit} {...actionProps} startIcon={<Edit/>}>Edit</Button>
                </>}
        </Stack>
    );
}