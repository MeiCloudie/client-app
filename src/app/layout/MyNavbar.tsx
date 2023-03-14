import { AppBar, Toolbar } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import MyBreadcrumb from "./MyBreadcrump";
import { Link } from "react-router-dom";

const MyNavbar = () => (
    <AppBar className="py-0 navbar">
        <Toolbar>
            <Link className="fs-6 home-brand" to="/home">
                <HouseIcon />
                plantogether
            </Link>
            <div className="me-auto">
                <MyBreadcrumb />
            </div>
        </Toolbar>

    </AppBar>
);

export default MyNavbar;