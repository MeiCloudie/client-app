
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardHeader, CardContent, Avatar } from "@mui/material";

import User from "../../app/models/User";
import { MissionPriorities } from "../../app/enums/MissionPriorities";
import { MissionStates } from "../../app/enums/MissionStates";
import { observer } from "mobx-react-lite";
import MissionForm from "./form/MissionForm";

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

const userSelection = users.map((u) => {
  return {
    value: u.email,
    label: u.displayName,
  };
});

const prioritySelection = [
  {
    value: MissionPriorities.Low,
    label: "Low",
  },
  {
    value: MissionPriorities.Medium,
    label: "Medium",
  },
  {
    value: MissionPriorities.High,
    label: "High",
  },
];

const stateSelection = [
  {
    value: MissionStates.New,
    label: "New",
  },
  {
    value: MissionStates.Active,
    label: "Active",
  },
  {
    value: MissionStates.Resolved,
    label: "Resolved",
  },
  {
    value: MissionStates.Closed,
    label: "Closed",
  },
];

const MissionDetailsPage = observer(() => {

  return (
    <Box sx={{ pl: 40, "& > :not(style)": { m: 1, width: "100ch" } }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          wordWrap: "break-word",
          margin: "10px",
          fontWeight: "bold",
          color: "#443e3e",
        }}
      >
        Mission Details
      </Typography>

      <MissionForm />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
        }}
      >
        <Card style={{ backgroundColor: "#f0c9a7", width: "100%" }}>
          <CardHeader
            avatar={
              <Avatar aria-label="user" style={{ backgroundColor: "#1565c0" }}>
                U
              </Avatar>
            }
            title="John Doe"
            subheader="March 26, 2023"
          />
          <CardContent>
            <Typography variant="body1">This is a comment.</Typography>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
});

export default MissionDetailsPage;
