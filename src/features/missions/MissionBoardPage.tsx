import * as React from "react";

import { Box, Divider, Stack, Typography } from "@mui/material";
import { MissionStates } from "../../app/enums/MissionStates";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ForumIcon from "@mui/icons-material/Forum";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";

import { Project } from "../../app/models/Project";
import { User } from "../../app/models/User";
import { useStore } from "../../app/stores/store";
import { useParams } from "react-router-dom";
import { GridRowsProp } from "@mui/x-data-grid";
import LinkButton from "../../app/common/button/LinkButton";
import MissionBoardRow from "./components/MissionBoardRow";

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

const projects: Project[] = [
  {
    id: "project1",
    createDate: new Date(2023, 1, 1),
    name: "study-plan",
    title: "Study Plan",
    description: "Effective study plan and healthy balance",
    groupName: "hello-group",
    processes: []
  },
  {
    id: "project2",
    createDate: new Date(2023, 1, 1),
    name: "sport-plan",
    title: "Sport Plan",
    description: "Make a plan to exercise and exercise together",
    groupName: "hello-group",
    processes: []
  },
];

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MissionBoardPage = () => {
  const [expanded, setExpanded] = React.useState<Set<string>>(
    new Set<string>()
  );
  const params = useParams();
  const { missionStore, projectStore } = useStore();
  const { loadMissionByProjectName } = missionStore;
  const [selectedMissionId, setSelectedMissionId] = React.useState<string>();
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
  const handleExpandClick = (id: string) => {
    if (expanded.has(id)) {
      setExpanded((set) => {
        set.delete(id);
        return new Set<string>(set);
      });
    } else {
      setExpanded((set) => new Set<string>(set.add(id)));
    }
  };

  const states = ["New", "Active", "Resolved", "Closed"];

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
