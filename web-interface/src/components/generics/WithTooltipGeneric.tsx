import {Tooltip, TooltipProps} from "@mui/material";

interface WithTooltipGenericProps extends TooltipProps {
    hasTooltip?: boolean;
}

export default function WithTooltipGeneric({hasTooltip, children, ...props}: Readonly<WithTooltipGenericProps>) {
    if (hasTooltip) return <Tooltip {...props}>{children}</Tooltip>;
    return children;
}