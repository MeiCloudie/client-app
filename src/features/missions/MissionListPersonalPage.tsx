import * as React from "react";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

import { Mission } from "../../app/models/Mission";
import { User } from "../../app/models/User";
import { MissionPriorities } from "../../app/enums/MissionPriorities";
import { MissionStates } from "../../app/enums/MissionStates";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";

const user: User = {
  displayName: "Mei",
  email: "mei@gmail.com",
  token: "meiToken",
  roles: ["Leader"],
};

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


const MissionListPersonalPage = () => {
  const params = useParams();
  const { missionStore, projectStore } = useStore();
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
          MISSION LIST
        </Typography>
      </div>

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
        />
      </Box>
    </div>
  );
};

export default MissionListPersonalPage;
