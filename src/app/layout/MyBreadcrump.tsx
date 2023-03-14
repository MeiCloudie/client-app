import { Breadcrumbs } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useParams } from "react-router-dom";

const MyBreadcrumb = () => {
    const location = useLocation();
    const params = useParams();
    function getBreadcrumpItem(path: string, title: string, link: string = path) {
        if (location.pathname === path)
            return <Typography className="breadcrumb-item" color="text.primary">{title}</Typography>
        return <Link className="breadcrumb-item" to={link}>{title}</Link>
    }
    return (
        <Breadcrumbs className="mt-3">
            {location.pathname === "/home" && getBreadcrumpItem("/home", "Home")}

            {params.userName && getBreadcrumpItem(`/profiles/${params.userName}`, `${params.userName}'s profile`)}

            {location.pathname === "/settings" && getBreadcrumpItem("/settings", "Settings")}

            {params.groupName && getBreadcrumpItem(`/${params.groupName}`, params.groupName)}

            {params.projectName && getBreadcrumpItem(`/${params.groupName}/${params.projectName}`, params.projectName,
                `/${params.groupName}/${params.projectName.replace(
                    /\s\s+/g,
                    "-"
                )}`)
            }

            {location.pathname
                .replace(/%20/g, " ")
                .includes(`/${params.groupName}/${params.projectName}/missions`) &&
                getBreadcrumpItem(`/${params.groupName}/${params.projectName}/missions`, "Missions")
            }

            {location.pathname ===
                `/${params.groupName}/${params.projectName}/missions/${params.missionId}` && getBreadcrumpItem(`/${params.groupName}/${params.projectName}/missions/${params.missionId}`, params.missionId!)}

            {location.pathname
                .replace(/%20/g, " ")
                .includes(`/${params.groupName}/${params.projectName}/boards`) && getBreadcrumpItem(`/${params.groupName}/${params.projectName}/boards`, "Boards")}

            {location.pathname ===
                `/${params.groupName}/${params.projectName}/boards/${params.missionId}` && getBreadcrumpItem(`/${params.groupName}/${params.projectName}/boards/${params.missionId}`, params.missionId!)}

            {location.pathname === "/personal/missions" && getBreadcrumpItem("/personal/missions",
                "Personal Missions"
            )}

            {location.pathname === "/personal/boards" && getBreadcrumpItem("/personal/boards",
                "Personal Boards"
            )}

            {location.pathname === "/help" && getBreadcrumpItem("/help",
                "Help"
            )}

            {location.pathname === "/about-us" && getBreadcrumpItem("/about-us", "About Us"
            )}
        </Breadcrumbs>
    );
};

export default MyBreadcrumb;
