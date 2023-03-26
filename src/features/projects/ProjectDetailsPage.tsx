import { Button, Divider, Stack, Typography } from "@mui/material";
import Project from "../../app/models/Project";

import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import EditIcon from '@mui/icons-material/Edit';

const project: Project = {
  id: "project1",
  createDate: new Date(2023, 1, 1),
  name: "study-plan",
  title: "Study Plan",
  description: "Effective study plan and healthy balance",
};

const ProjectDetailsPage = () => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Typography
          variant="h1"
          gutterBottom
          style={{
            wordWrap: "break-word",
            margin: "10px 0",
            fontWeight: "bold",
            color: "#1565c0",
          }}
        >
          {project.title}
        </Typography>
      </div>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#efcead",
          borderStyle: "solid",
          borderRadius: "10px",
          borderColor: "#9196de",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          style={{
            wordWrap: "break-word",
            margin: "10px 0",
            fontWeight: "bold",
            color: "#9196de",
          }}
        >
          About this project:
        </Typography>

        <Typography
          variant="h4"
          gutterBottom
          style={{
            wordWrap: "break-word",
            margin: "0",
            fontSize: "100",
            color: "#443e3e",
          }}
        >
          {project.description}
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
          style={{
            wordWrap: "break-word",
            margin: "10px 0",
            fontWeight: "bold",
            color: "#9196de",
          }}
        >
          Process:
        </Typography>
      </div>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        style={{ padding: "10px 0", justifyContent: "center" }}
      >
        <Button variant="contained" startIcon={<AssignmentIcon />}>
          Missions
        </Button>
        <Button variant="contained" startIcon={<DashboardCustomizeIcon />}>
          Boards
        </Button>
        <Button variant="contained" startIcon={<EditIcon />}>
          Edit
        </Button>
      </Stack>
    </div>
  );
};
export default ProjectDetailsPage;
