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
import { Card, CardHeader, CardContent, Avatar } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AccountCircle from "@mui/icons-material/AccountCircle";

import User from "../../app/models/User";
import { MissionPriorities } from "../../app/enums/MissionPriorities";
import { MissionStates } from "../../app/enums/MissionStates";
import { Mission, MissionFormValues } from "../../app/models/Mission";
import agent from "../../app/api/agent";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

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
  const [user, setUser] = React.useState("");
  const [priority, setPriority] = React.useState<MissionPriorities>();
  const [state, setState] = React.useState<MissionStates>();
  // const [mission, setMission] = React.useState<Mission>({
  //   id: "",
  //   title: "",
  //   description: "",
  //   priority: MissionPriorities.Low,
  //   state: MissionStates.New,
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   completedDate: new Date(),
  //   createDate: new Date(),
  // });
  const { missionStore } = useStore()
  // const mission = missionStore.selectedMission ?? new Mission()

  const [mission, setMission] = React.useState<MissionFormValues>(new MissionFormValues())
  
  const { missionId } = useParams<{ missionId : string }>()

  React.useEffect(() => {
    missionStore.loadMission(missionId!).then(() => {
      setMission(new MissionFormValues(missionStore.selectedMission))
      console.log(missionStore.selectedMission)
    })
  }, [missionStore, missionId])
  
  const handleClick = () => {
    console.log(missionId, mission)
    missionStore.updateMission(missionId!, mission)
    .then(() => {

      console.log('Update successfully')
    })
    .catch(e => console.log(e))
  }

  const handleTitleChange = (value : any) => {
    console.log(value)
  }

  const userHandleChange = (event: SelectChangeEvent) => {
    setUser(event.target.value);
  };

  const priorityHandleChange = (event: SelectChangeEvent<MissionPriorities>) => {
    setPriority(event.target.value as MissionPriorities);
  };

  const stateHandleChange = (event: SelectChangeEvent<MissionStates>) => {
    setState(event.target.value as MissionStates);
  };

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

      <Box
        component="form"
        sx={{
          "& > :not(style)": { mt: 1, mb: 1, width: "100ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          key={mission!.id}
          id="title-outlined-basic"
          label="Title"
          variant="outlined"
          placeholder="Enter title here!"
          defaultValue={mission!.title}
          onChange={handleTitleChange}
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
            defaultValue={user}
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
            key={mission.priority}
            labelId="priority-select-label"
            id="priority-select"
            defaultValue={mission.priority}
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
            key={mission.state}
            labelId="state-select-label"
            id="state-select"
            defaultValue={mission.state}
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
          key={mission.description}
          id="description-outlined-multiline-static"
          label="Description"
          multiline
          placeholder="Write some description here..."
          defaultValue={mission.description}
          rows={4}
        />

        <TextField
          id="start-date-outlined-basic"
          label="Start Date"
          variant="outlined"
          placeholder="Hours"
          defaultValue={mission.startDate}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTimeFilledIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="end-date-outlined-basic"
          label="End Date"
          variant="outlined"
          placeholder="Hours"
          defaultValue={mission.endDate}
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
          defaultValue={mission.completedDate}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTimeFilledIcon />
              </InputAdornment>
            ),
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <Stack spacing={2} direction="row">
            <Button variant="contained">Back to List</Button>
            <Button onClick={handleClick} variant="contained">Save</Button>
          </Stack>
        </div>

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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <Stack spacing={2} direction="row">
            <Button variant="contained">Cancel</Button>
            <Button variant="contained">Save</Button>
          </Stack>
        </div>
      </Box>

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
