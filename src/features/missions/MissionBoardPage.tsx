import * as React from "react";

import { Divider, Stack, Typography } from "@mui/material";
import { MissionStates } from "../../app/enums/MissionStates";
import Grid from "@mui/material/Grid";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useStore } from "../../app/stores/store";
import { useParams } from "react-router-dom";
import { GridRowsProp } from "@mui/x-data-grid";
import LinkButton from "../../app/common/button/LinkButton";
import MissionBoardRow from "./components/MissionBoardRow";

const MissionBoardPage = () => {
  const params = useParams();
  const { missionStore, projectStore } = useStore();
  const { loadMissionByProjectName } = missionStore;
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  React.useEffect(() => {
    if (params.projectName === undefined) return;
    loadMissionByProjectName(params.projectName).then(() => {
      if (!projectStore.selectedProject) projectStore.loadProject(params.projectName!).then(() => {
        missionStore.loadMembersForMissions().then()
        setRows(
          missionStore.missionList.map((m) => {
            console.log(missionStore.missionList)
            const randomIndex = Math.floor(Math.random() * (3 - 0)) + 0;
            const states = ["New", "Active", "Resolved", "Closed"];
            return {
              id: m.id,
              title: m.title,
              assignedTo: m.members.length > 0 ? m.members[0].displayName : "No one",
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
        )
      });
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
          BOARD
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
          Project: {projectStore.selectedProject ? projectStore.selectedProject.title : "..."}
        </Typography>
      </div>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        style={{ padding: "10px 0" }}
      >
        <LinkButton
          to={`/${params.groupName}/${params.projectName}/missions/create`}
          label="New Mission"
          icon={<AddCircleIcon />}
        />
      </Stack>

      <Grid container spacing={2}>
        <MissionBoardRow rowType={MissionStates.New} missionList={missionStore.missionList} />
        <MissionBoardRow rowType={MissionStates.Active} missionList={missionStore.missionList} />
        <MissionBoardRow rowType={MissionStates.Resolved} missionList={missionStore.missionList} />
        <MissionBoardRow rowType={MissionStates.Closed} missionList={missionStore.missionList} />
      </Grid>
    </div>
  );
};

export default MissionBoardPage;
