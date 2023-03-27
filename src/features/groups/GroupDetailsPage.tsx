import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Box, Typography } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import Group from "../../app/models/Group";
import User from "../../app/models/User";

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

const GroupDetailsPage = () => {
  const group: Group = {
    id: "group1",
    name: "owl",
    description: "Team owl",
    title: "Group Owl",
    owner: {
      userName: "Mei",
      displayName: "Van",
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
            color: "#1565c0",
          }}
        >
          Colleagues:
        </Typography>

        <List sx={{ width: "100%", bgcolor: "#f1b590", borderRadius: "10px" }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#9196de"}}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={users[0].displayName} secondary={users[0].roles[0]} />
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default GroupDetailsPage;
