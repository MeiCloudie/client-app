import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import GroupsIcon from "@mui/icons-material/Groups";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import Group from "../../app/models/Group";
import { Badge, Button, Chip, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { MissionPriorities } from "../../app/enums/MissionPriorities";
import { MissionStates } from "../../app/enums/MissionStates";
import Mission from "../../app/models/Mission";

const groups: Group[] = [
  {
    id: "group1",
    name: "owl",
    description: "Team owl",
    title: "Group Owl",
    owner: {
      userName: "Mei",
      displayName: "Van",
      role: "Leader",
    },
    projects: [
      {
        id: "project1",
        createDate: new Date(2023, 1, 1),
        name: "study-plan",
        title: "Study Plan",
        description: "Effective study plan and healthy balance",
      },
      {
        id: "project2",
        createDate: new Date(2023, 7, 12),
        name: "Healthy and Balance",
        title: "Life",
        description: "Happiness",
      },
    ],
  },
  {
    id: "group2",
    name: "abc",
    description: "Team abc",
    title: "Group ABC",
    owner: {
      userName: "Slime",
      displayName: "Thai",
      role: "Member",
    },
    projects: [
      {
        id: "projectA",
        createDate: new Date(2023, 1, 1),
        name: "sport-plan",
        title: "Sport Plan",
        description: "Sport is the best",
      },
      {
        id: "projectB",
        createDate: new Date(2023, 7, 12),
        name: "Healthy Life",
        title: "Life Style",
        description: "Happiness",
      },
      {
        id: "projectC",
        createDate: new Date(2023, 7, 12),
        name: "Healthy Life",
        title: "Life Style",
        description: "Happiness",
      },
    ],
  },
];

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

const HomePage = () => {
  return (
    <div>
      <div style={{ textAlign: "center", margin: "30px" }}>
        <Typography
          variant="h1"
          gutterBottom
          style={{
            wordWrap: "break-word",
            margin: "10px 0",
            fontWeight: "800",
            color: "#1565c0",
          }}
        >
          PLAN TOGETHER
        </Typography>

        <Typography
          variant="h4"
          gutterBottom
          style={{
            wordWrap: "break-word",
            fontWeight: "bold",
            color: "#443e3e",
          }}
        >
          Welcome! Let's start planning!
        </Typography>

        <Button variant="contained" startIcon={<GroupAddIcon />}>
          Create New Group
        </Button>
      </div>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {groups.map((g, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <Card sx={{ margin: "10px", bgcolor: "#ebdbce" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="project">
                    <GroupsIcon />
                  </Avatar>
                }
                title={g.title}
                subheader={g.owner.role}
              />
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <Badge
                    badgeContent={g.projects.length}
                    max={99}
                    color="primary"
                  >
                    <Chip
                      icon={<BusinessCenterIcon />}
                      label="Project"
                      sx={{ fontWeight: "600" }}
                    />
                  </Badge>
                  <Badge
                    badgeContent={missions.length}
                    max={99}
                    color="primary"
                  >
                    <Chip
                      icon={<AssignmentIcon />}
                      label="Mission"
                      sx={{ fontWeight: "600" }}
                    />
                  </Badge>
                </Stack>
                <Button
                  variant="contained"
                  endIcon={<DoubleArrowIcon />}
                  sx={{ margin: "20px 0" }}
                >
                  Group
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
