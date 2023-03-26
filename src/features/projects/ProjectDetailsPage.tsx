import * as React from "react";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import Project from "../../app/models/Project";

import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import EditIcon from "@mui/icons-material/Edit";
import Process from "../../app/models/Process";

const projects: Project[] = [
  {
    id: "project2",
    createDate: new Date(2023, 1, 1),
    name: "study-plan",
    title: "Study Plan",
    description: "Effective study plan and healthy balance",
  },
];

const processes: Process[] = [
  {
    title: "First process",
    description: "Some text here... Some text here...",
    isDone: false,
    projectId: "project1",
    project: projects[0],
  },
  {
    title: "Second process",
    description: "Some text here...",
    isDone: true,
    projectId: "project1",
    project: projects[0],
  },
  {
    title: "Third process",
    description: "Some text here...",
    isDone: true,
    projectId: "project1",
    project: projects[0],
  },
];

const ProjectDetailsPage = () => {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

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
          {projects[0].title}
        </Typography>
      </div>

      <Box
        sx={{
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
            color: "#443e3e",
          }}
        >
          {projects[0].description}
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

        <List
          sx={{
            width: "100%",
            bgcolor: "#f1b590",
            position: "relative",
            overflow: "auto",
            maxHeight: 400,
          }}
        >
          {processes.map((p, i) => {
            return (
              <ListItem disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(i)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(i) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={`${i + 1} - ${p.title}`} secondary={p.description} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

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
