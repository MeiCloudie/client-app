
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
interface LinkButtonProps {
    label: string
    icon?: React.ReactNode
    to?: string
}

const LinkButton = (props: LinkButtonProps) => (
    <Link
        to={props.to ?? ""}
        style={{ textDecoration: "none" }}
    >
        <Button variant="contained" startIcon={props.icon}>
            {props.label}
        </Button>
    </Link>
);

export default LinkButton;
