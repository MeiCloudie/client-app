import * as React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AccountCircle from "@mui/icons-material/AccountCircle";

import User from "../../app/models/User";
import { MissionPriorities } from "../../app/enums/MissionPriorities";
import { MissionStates } from "../../app/enums/MissionStates";
import { textAlign } from "@mui/system";

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

const MissionDetailsPage = () => {
  const [user, setUser] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [state, setState] = React.useState("");

  const userHandleChange = (event: SelectChangeEvent) => {
    setUser(event.target.value);
  };

  const priorityHandleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const stateHandleChange = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
  };

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          wordWrap: "break-word",
          margin: "0",
          fontWeight: "bold",
          color: "#443e3e",
          textAlign: "center",
        }}
      >
        Mission Details
      </Typography>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100ch" },
        }}
        noValidate
        autoComplete="off"
        style={{ textAlign: "center" }}
      >
        <TextField
          id="title-outlined-basic"
          label="Title"
          variant="outlined"
          placeholder="Enter title here!"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AssignmentIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="assigned-to-select-label">Assigned to</InputLabel>
          <Select
            labelId="assigned-to-select-label"
            id="assigned-to-select"
            value={user}
            label="Assigned to"
            onChange={userHandleChange}
            startAdornment={
              <InputAdornment position="start">
                <AssignmentIndIcon />
              </InputAdornment>
            }
          >
            {userSelection.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="priority-select-label">Priority</InputLabel>
          <Select
            labelId="priority-select-label"
            id="priority-select"
            value={priority}
            label="Priority"
            onChange={priorityHandleChange}
            startAdornment={
              <InputAdornment position="start">
                <BookmarkIcon />
              </InputAdornment>
            }
          >
            {prioritySelection.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="state-select-label">State</InputLabel>
          <Select
            labelId="state-select-label"
            id="state-select"
            value={state}
            label="Priority"
            onChange={stateHandleChange}
            startAdornment={
              <InputAdornment position="start">
                <CheckBoxIcon />
              </InputAdornment>
            }
          >
            {stateSelection.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="description-outlined-multiline-static"
          label="Description"
          multiline
          placeholder="Write some description here..."
          rows={4}
        />

        <TextField
          id="estimate-outlined-basic"
          label="Estimate"
          variant="outlined"
          placeholder="Hours"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTimeFilledIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="remaining-outlined-basic"
          label="Remaining"
          variant="outlined"
          placeholder="Hours"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTimeFilledIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="completed-outlined-basic"
          label="Completed"
          variant="outlined"
          placeholder="Hours"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTimeFilledIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="discussion-outlined-textarea"
          label="Discussion"
          placeholder="Add a comment..."
          multiline
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="contained">Cancel</Button>
        <Button variant="contained">Save</Button>
      </Stack>

      {/* Comments */}
    </div>
  );
};

export default MissionDetailsPage;
