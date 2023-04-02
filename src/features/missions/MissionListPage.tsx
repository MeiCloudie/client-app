import * as React from "react";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

import { Mission } from "../../app/models/Mission";
import { User } from "../../app/models/User";
import { MissionPriorities } from "../../app/enums/MissionPriorities";
import { MissionStates } from "../../app/enums/MissionStates";
import { Project } from "../../app/models/Project";
import { useStore } from "../../app/stores/store";
import { useParams } from "react-router-dom";

const users: User[] = [
  {
    displayName: "Mei",
    email: "mei@gmail.com",
    token: "meiToken",
    roles: ["Leader"],
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
    roles: ["Member"],
  },
  {
    displayName: "Jane",
    email: "jane@example.com",
    token: "token456",
    roles: ["Member"],
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
    width: 200,
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

// const rows = missions.map((m) => {
//   const randomIndex = Math.floor(Math.random() * (3 - 0)) + 0;
//   const states = ["New", "Active", "Resolved", "Closed"];
//   return {
//     id: m.id,
//     title: m.title,
//     assignedTo: users[randomIndex].displayName,
//     state: states[m.state],
//     comments: randomIndex,
//     activityDate: m.createDate.toLocaleString("en-US", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     }),
//   };
// });

const MissionListPage = () => {
  const params = useParams();
  const { missionStore } = useStore();
  const { loadMissions } = missionStore;
  const [selectedMissionId, setSelectedMissionId] = React.useState<string>();
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  React.useEffect(() => {
    loadMissions().then(() => {
      setRows(
        missionStore.missionList.map((m) => {
          const randomIndex = Math.floor(Math.random() * (3 - 0)) + 0;
          const states = ["New", "Active", "Resolved", "Closed"];
          return {
            id: m.id,
            title: m.title,
            assignedTo: users[randomIndex].displayName,
            state: states[m.state],
            comments: randomIndex,
            activityDate: m.createDate.toLocaleString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };
        })
      );
    });
  }, []);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Typography
          variant="h1"
          gutterBottom
          style={{
            wordWrap: "break-word",
            margin: "0",
            fontWeight: "bold",
            color: "#1565c0",
          }}
        >
          MISSIONS
        </Typography>
        <Typography
          variant="h3"
          gutterBottom
          style={{
            wordWrap: "break-word",
            fontWeight: "700",
            color: "#443e3e",
          }}
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
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          href={`/${params.groupName}/${params.projectName}/missions/create`}
        >
          New Mission
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          disabled={!selectedMissionId}
          href={`/${params.groupName}/${params.projectName}/missions/${selectedMissionId}`}
        >
          Mission Details
        </Button>
        <Button variant="contained" startIcon={<DeleteIcon />} 
          disabled={!selectedMissionId}
          onClick={() => {
          missionStore.deleteMission(selectedMissionId!).then(() => window.location.reload())
        }}>
          Delete
        </Button>
      </Stack>

      <Box
        sx={{
          height: 400,
          width: "100%",
          borderStyle: "solid",
          borderRadius: "5px",
          borderColor: "#443e3e",
        }}
      >
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
          sx={{ background: "#efcead" }}
          onRowSelectionModelChange={(array: GridRowId[]) => setSelectedMissionId(array[array.length - 1].toString())}
        />
      </Box>
    </div>
  );
};

export default MissionListPage;
