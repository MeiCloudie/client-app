import * as React from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CachedIcon from "@mui/icons-material/Cached";

import { Group } from "../../app/models/Group";
import { User } from "../../app/models/User";
import { Project } from "../../app/models/Project";

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
  },
  {
    id: "project2",
    createDate: new Date(2023, 1, 1),
    name: "sport-plan",
    title: "Sport Plan",
    description: "Make a plan to exercise and exercise together",
  },
];

const GroupDetailsPage = () => {
  const group: Group = {
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
  };

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
          {group.title}
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
          {group.description}
        </Typography>
      </div>

      <Box
        sx={{
          padding: "20px",
          backgroundColor: "#efcead",
          borderStyle: "solid",
          borderRadius: "10px",
          borderColor: "#443e3e",
        }}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          style={{ padding: "10px 0", justifyContent: "left" }}
        >
          <Button variant="contained" startIcon={<GroupAddIcon />}>
            Add Members
          </Button>
          <Button variant="contained" startIcon={<AddBoxRoundedIcon />}>
            New Project
          </Button>
          <Button variant="contained" startIcon={<EditIcon />}>
            Edit Group
          </Button>
        </Stack>

        <Typography
          variant="h5"
          gutterBottom
          style={{
            wordWrap: "break-word",
            margin: "10px 0",
            fontWeight: "bold",
            color: "#443e3e",
          }}
        >
          Colleagues:
        </Typography>

        <List
          sx={{
            width: "100%",
            bgcolor: "#f5e4d6",
            borderRadius: "5px",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            borderColor: "#1565c0",
            borderStyle: "solid",
          }}
          disablePadding
        >
          {users.map((u) => (
            <ListItem
              secondaryAction={
                <div>
                  <IconButton edge="end">
                    <CachedIcon />
                  </IconButton>
                  <IconButton edge="end">
                    <GroupRemoveIcon />
                  </IconButton>
                </div>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#9196de" }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={u.displayName} secondary={u.roles} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Typography
          variant="h5"
          gutterBottom
          style={{
            wordWrap: "break-word",
            margin: "10px 0",
            fontWeight: "bold",
            color: "#443e3e",
          }}
        >
          Projects:
        </Typography>

        <List
          sx={{
            width: "100%",
            bgcolor: "#f5e4d6",
            borderRadius: "5px",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            borderColor: "#1565c0",
            borderStyle: "solid",
          }}
          disablePadding
        >
          {projects.map((p) => (
            <ListItem
              secondaryAction={
                <div>
                  <IconButton edge="end">
                    <MoreHorizIcon />
                  </IconButton>
                  <IconButton edge="end">
                    <RemoveCircleIcon />
                  </IconButton>
                </div>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#9196de" }} variant="rounded">
                    <BusinessCenterRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={p.title} secondary={p.description} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default GroupDetailsPage;
