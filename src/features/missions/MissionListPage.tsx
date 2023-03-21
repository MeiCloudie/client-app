import * as React from "react";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

import Mission from "../../app/models/Mission";
import User from "../../app/models/User";
import { MissionPriorities } from "../../app/enums/MissionPriorities";
import { MissionStates } from "../../app/enums/MissionStates";
import Project from "../../app/models/Project";

const users: User[] = [
  {
    displayName: "Mei",
    email: "mei@gmail.com",
    token: "meiToken",
    roles: ["Manager", "Leader"],
  },
  {
    displayName: "Slime",
    email: "slime@gmail.com",
    token: "slimeToken",
    roles: ["Member"],
  },
  {
    displayName: "John",
    email: "john@example.com",
    token: "token123",
    roles: ["Manager", "Developer"],
  },
  {
    displayName: "Jane",
    email: "jane@example.com",
    token: "token456",
    roles: ["Designer"],
  },
];

const project: Project = {
  id: "project1",
  createDate: new Date(2023, 1, 1),
  name: "study-plan",
  title: "Study Plan",
  description: "Effective study plan and healthy balance",
};

const missions: Mission[] = [
  {
    id: "mission1",
    title: "Study English",
    description: "Improve English",
    priority: MissionPriorities.Low,
    state: MissionStates.Resolved,
    startDate: new Date(2023, 7, 14),
    endDate: new Date(2023, 10, 14),
    completedDate: new Date(2023, 10, 14),
    createDate: new Date(2023, 5, 12),
  },
  {
    id: "mission2",
    title: "Learn Guitar",
    description: "Practice playing guitar for 1 hour every day",
    priority: MissionPriorities.High,
    state: MissionStates.Active,
    startDate: new Date(2023, 8, 1),
    endDate: new Date(2023, 11, 1),
    completedDate: new Date(2023, 11, 1),
    createDate: new Date(2023, 7, 20),
  },
  {
    id: "mission3",
    title: "Complete Coding Project",
    description: "Finish building a React web application",
    priority: MissionPriorities.Medium,
    state: MissionStates.New,
    startDate: new Date(2023, 6, 1),
    endDate: new Date(2023, 9, 1),
    completedDate: new Date(2023, 9, 1),
    createDate: new Date(2023, 5, 1),
  },
  {
    id: "mission4",
    title: "Read 10 Books",
    description: "Read a mix of fiction and non-fiction books",
    priority: MissionPriorities.Low,
    state: MissionStates.Closed,
    startDate: new Date(2023, 7, 1),
    endDate: new Date(2023, 11, 1),
    completedDate: new Date(2023, 11, 1),
    createDate: new Date(2023, 6, 1),
  },
  {
    id: "mission5",
    title: "Exercise for 30 minutes daily",
    description: "Run or walk for 30 minutes each day",
    priority: MissionPriorities.Medium,
    state: MissionStates.New,
    startDate: new Date(2023, 3, 1),
    endDate: new Date(2023, 6, 30),
    completedDate: new Date(2023, 6, 30),
    createDate: new Date(2023, 2, 15),
  },
  {
    id: "mission6",
    title: "Learn React Native",
    description: "Build a mobile app with React Native",
    priority: MissionPriorities.High,
    state: MissionStates.Active,
    startDate: new Date(2023, 4, 1),
    endDate: new Date(2023, 6, 30),
    completedDate: new Date(2023, 6, 30),
    createDate: new Date(2023, 3, 1),
  },
  {
    id: "mission7",
    title: "Learn Spanish",
    description: "Take a Spanish course and practice daily",
    priority: MissionPriorities.Low,
    state: MissionStates.Resolved,
    startDate: new Date(2023, 1, 1),
    endDate: new Date(2023, 12, 31),
    completedDate: new Date(2023, 11, 31),
    createDate: new Date(2023, 0, 1),
  },
  {
    id: "mission8",
    title: "Write a novel",
    description: "Write a novel of at least 50,000 words",
    priority: MissionPriorities.High,
    state: MissionStates.Closed,
    startDate: new Date(2023, 2, 1),
    endDate: new Date(2024, 1, 28),
    completedDate: new Date(2024, 1, 28),
    createDate: new Date(2023, 1, 1),
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "title",
    headerName: "Title",
    width: 400,
  },
  {
    field: "assignedTo",
    headerName: "Assigned To",
    width: 300,
  },
  {
    field: "state",
    headerName: "State",
    width: 200,
  },
  {
    field: "comments",
    headerName: "Comments",
    width: 200,
  },
  {
    field: "activityDate",
    headerName: "Activity Date",
    width: 200,
  },
];

const rows = [
  {
    id: missions[0].id,
    title: missions[0].title,
    assignedTo: users[0].displayName,
    state: missions[0].state,
    comments: 2,
    activityDate: missions[0].createDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  },
  {
    id: missions[1].id,
    title: missions[1].title,
    assignedTo: users[0].displayName,
    state: missions[1].state,
    comments: 5,
    activityDate: missions[1].createDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  },
  {
    id: missions[2].id,
    title: missions[2].title,
    assignedTo: users[1].displayName,
    state: missions[2].state,
    comments: 0,
    activityDate: missions[2].createDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  },
  {
    id: missions[3].id,
    title: missions[3].title,
    assignedTo: users[1].displayName,
    state: missions[3].state,
    comments: 20,
    activityDate: missions[3].createDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  },
  {
    id: missions[4].id,
    title: missions[4].title,
    assignedTo: users[2].displayName,
    state: missions[4].state,
    comments: 10,
    activityDate: missions[4].createDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  },
  {
    id: missions[5].id,
    title: missions[5].title,
    assignedTo: users[2].displayName,
    state: missions[5].state,
    comments: 0,
    activityDate: missions[5].createDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  },
  {
    id: missions[6].id,
    title: missions[6].title,
    assignedTo: users[3].displayName,
    state: missions[6].state,
    comments: 0,
    activityDate: missions[6].createDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  },
  {
    id: missions[7].id,
    title: missions[7].title,
    assignedTo: users[2].displayName,
    state: missions[7].state,
    comments: 10,
    activityDate: missions[7].createDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  },
];

const MissionListPage = () => {
  return (
    <div>
      <div style={{textAlign: "center"}}>
        <Typography
          variant="h1"
          gutterBottom
          style={{ wordWrap: "break-word", margin: "0", fontWeight: "bold", color: "#1565c0" }}
        >
          MISSIONS
        </Typography>
        <Typography
          variant="h3"
          gutterBottom
          style={{ wordWrap: "break-word", fontWeight: "700", color: "#a47b62" }}
        >
          Project: {project.title}
        </Typography>
      </div>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        style={{ padding: "10px 0" }}
      >
        <Button variant="contained" startIcon={<AddCircleIcon />}>
          New Mission
        </Button>
        <Button variant="contained" startIcon={<EditIcon />}>
          Mission Details
        </Button>
        <Button variant="contained" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </Stack>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{ background: "#f0c9a7" }}
        />
      </Box>
    </div>
  );
};

export default MissionListPage;
