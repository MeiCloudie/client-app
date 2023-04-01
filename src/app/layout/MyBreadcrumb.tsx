import { Breadcrumbs } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useParams } from "react-router-dom";

const MyBreadcrumb = () => {
  const location = useLocation();
  const params = useParams();

  function getBreadcrumbItem(path: string, title: string, link: string = path) {
    if (location.pathname === path + "/")
      return (
        <Typography className="breadcrumb-item" color="text.primary">
          {title}
        </Typography>
      );
    return (
      <Link className="breadcrumb-item" to={link}>
        {title}
      </Link>
    );
  }
  return (
    <Breadcrumbs className="mt-3" sx={{ bgcolor: "#443e3e"}}>
      {location.pathname === "/home" && getBreadcrumbItem("/home", "Home")}

      {params.userName &&
        getBreadcrumbItem(
          `/profiles/${params.userName}`,
          `${params.userName}'s profile`
        )}

      {location.pathname === "/settings" &&
        getBreadcrumbItem("/settings", "Settings")}

      {params.groupName &&
        getBreadcrumbItem(`/${params.groupName}`, params.groupName)}

      {location.pathname
        .replace(/%20/g, " ")
        .includes(`/${params.groupName}/info`) &&
        getBreadcrumbItem(
          `/${params.groupName}/info`,
          `${params.groupName}'s information`
        )}

      {location.pathname
        .replace(/%20/g, " ")
        .includes(`/${params.groupName}/members`) &&
        getBreadcrumbItem(
          `/${params.groupName}/members`,
          `${params.groupName}'s members`
        )}

      {params.projectName &&
        getBreadcrumbItem(
          `/${params.groupName}/${params.projectName}`,
          params.projectName,
          `/${params.groupName}/${params.projectName.replace(/\s\s+/g, "-")}`
        )}

      {location.pathname
        .replace(/%20/g, " ")
        .includes(`/${params.groupName}/${params.projectName}/info`) &&
        getBreadcrumbItem(
          `/${params.groupName}/${params.projectName}/info`,
          `${params.projectName}'s information`
        )}

      {location.pathname
        .replace(/%20/g, " ")
        .includes(`/${params.groupName}/${params.projectName}/missions`) &&
        getBreadcrumbItem(
          `/${params.groupName}/${params.projectName}/missions`,
          "Missions"
        )}

      {location.pathname ===
        `/${params.groupName}/${params.projectName}/missions/${params.missionId}` &&
        getBreadcrumbItem(
          `/${params.groupName}/${params.projectName}/missions/${params.missionId}`,
          params.missionId!
        )}

      {location.pathname
        .replace(/%20/g, " ")
        .includes(`/${params.groupName}/${params.projectName}/boards`) &&
        getBreadcrumbItem(
          `/${params.groupName}/${params.projectName}/boards`,
          "Boards"
        )}

      {location.pathname ===
        `/${params.groupName}/${params.projectName}/boards/${params.missionId}` &&
        getBreadcrumbItem(
          `/${params.groupName}/${params.projectName}/boards/${params.missionId}`,
          params.missionId!
        )}

      {location.pathname === "/personal" &&
        getBreadcrumbItem("/personal", "Personal Mission List")}

      {location.pathname === "/help" && getBreadcrumbItem("/help", "Help")}

      {location.pathname === "/about-us" &&
        getBreadcrumbItem("/about-us", "About Us")}
    </Breadcrumbs>
  );
};

export default MyBreadcrumb;
