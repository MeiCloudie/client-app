import * as React from "react";

import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowSelectionModel,
  GridRowsProp,
} from "@mui/x-data-grid";
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
import { Link, useParams } from "react-router-dom";

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

const MissionListPage = () => {
  const params = useParams();
  const { missionStore, projectStore } = useStore();
  const { loadMissionByProjectName } = missionStore;
  const [selectedMissionId, setSelectedMissionId] = React.useState<string>();
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  React.useEffect(() => {
    if (params.projectName === undefined) return;
    loadMissionByProjectName(params.projectName).then(() => {
      if (!projectStore.selectedProject) projectStore.loadProject(params.projectName!).then()
      setRows(
        missionStore.missionList.map((m) => {
          const randomIndex = Math.floor(Math.random() * (3 - 0)) + 0;
          const states = ["New", "Active", "Resolved", "Closed"];
          return {
            id: m.id,
            title: m.title,
            assignedTo: m.id,
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
  }, [params.projectName]);

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
          Project: {projectStore.selectedProject!.title}
        </Typography>
      </div>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        style={{ padding: "10px 0" }}
      >
        <Link
          to={`/${params.groupName}/${params.projectName}/missions/create`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" startIcon={<AddCircleIcon />}>
            New Mission
          </Button>
        </Link>
        <Link
          to={`/${params.groupName}/${params.projectName}/missions/${selectedMissionId}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            disabled={!selectedMissionId}
          >
            Mission Details
          </Button>
        </Link>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          disabled={!selectedMissionId}
          onClick={() => {
            missionStore
              .deleteMission(selectedMissionId!)
              .then(() => window.location.reload());
          }}
        >
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
          sx={{ background: "#efcead" }}
          onRowSelectionModelChange={(array: GridRowId[]) =>
            setSelectedMissionId(array[array.length - 1].toString())
          }
        />
      </Box>
    </div>
  );
};

export default MissionListPage;
