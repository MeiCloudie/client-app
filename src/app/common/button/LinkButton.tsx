
import { Button, SxProps, Theme } from "@mui/material";
import { Link } from "react-router-dom";
interface LinkButtonProps {
    label: string
    icon?: React.ReactNode
    to?: string
    sx?: SxProps<Theme>
}

const LinkButton = (props: LinkButtonProps) => (
    <Link
        to={props.to ?? ""}
        style={{ textDecoration: "none" }}
    >
        <Button variant="contained" startIcon={props.icon} sx={{...props.sx}}>
            {props.label}
        </Button>
    </Link>
);

export default LinkButton;
