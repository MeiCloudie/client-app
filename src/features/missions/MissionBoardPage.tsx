import * as React from "react";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { MissionPriorities } from "../../app/enums/MissionPriorities";
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

import Mission from "../../app/models/Mission";
import Project from "../../app/models/Project";
import User from "../../app/models/User";

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
    state: MissionStates.New,
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
    state: MissionStates.New,
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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
          Project: {projects[0].title}
        </Typography>
      </div>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        style={{ padding: "10px 0" }}
      >
        <Button variant="contained" startIcon={<AddCircleIcon />}>
          New Mission
        </Button>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={3}>
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
            New: {missions.filter((m) => m.state === MissionStates.New).length}/
            {missions.length}
          </Typography>
          <Box
            sx={{
              padding: "20px",
              marginBottom: "20px",
              backgroundColor: "#efcead",
              borderStyle: "solid",
              borderRadius: "5px",
              borderColor: "#443e3e",
              overflow: "auto",
              height: 600,
            }}
          >
            {missions
              .filter((m) => m.state === MissionStates.New)
              .map((m, i) => {
                const randomIndex = Math.floor(Math.random() * (3 - 0)) + 0;
                return (
                  <Card
                    sx={{
                      maxWidth: 345,
                      marginBottom: "10px",
                      bgcolor: "#ffe8e6",
                      borderStyle: "solid",
                      borderRadius: "10px",
                      borderColor: "#1565c0",
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "#1565c0" }} variant="rounded">
                          <AssignmentIcon />
                        </Avatar>
                      }
                      action={
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={m.title}
                      subheader={`State: ${states[m.state]}`}
                    />
                    <CardContent sx={{ padding: "0" }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: "#299740" }}>
                            <PersonIcon />
                          </Avatar>
                        }
                        title={users[randomIndex].displayName}
                        subheader={users[randomIndex].roles}
                      />
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton>
                        <ForumIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography
                          variant="h6"
                          color={"#1565c0"}
                          fontWeight={"bold"}
                        >
                          Description:
                        </Typography>
                        <Typography variant="body1">{m.description}</Typography>
                        <Typography
                          variant="h6"
                          color={"#1565c0"}
                          fontWeight={"bold"}
                        >
                          Timeline:
                        </Typography>
                        <Typography variant="body1">
                          {`Create Date: ${m.createDate.toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          )}`}
                          <br />
                          {`Start Date: ${m.startDate.toLocaleString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}`}
                          <br />
                          {`End Date: ${m.endDate.toLocaleString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}`}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                );
              })}
          </Box>
        </Grid>

        <Grid item xs={3}>
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
              Active:{" "}
              {
                missions.filter(
                  (mission) => mission.state === MissionStates.Active
                ).length
              }
              /{missions.length}
            </Typography>

          <Box
            sx={{
              padding: "20px",
              marginBottom: "20px",
              backgroundColor: "#efcead",
              borderStyle: "solid",
              borderRadius: "5px",
              borderColor: "#443e3e",
              overflow: "auto",
              height: 600,
            }}
          >

            {missions
              .filter((m) => m.state === MissionStates.Active)
              .map((m, i) => {
                const randomIndex = Math.floor(Math.random() * (3 - 0)) + 0;
                return (
                  <Card
                    sx={{
                      maxWidth: 345,
                      marginBottom: "10px",
                      bgcolor: "#ffe8e6",
                      borderStyle: "solid",
                      borderRadius: "10px",
                      borderColor: "#1565c0",
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "#1565c0" }} variant="rounded">
                          <AssignmentIcon />
                        </Avatar>
                      }
                      action={
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={m.title}
                      subheader={`State: ${states[m.state]}`}
                    />
                    <CardContent sx={{ padding: "0" }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: "#299740" }}>
                            <PersonIcon />
                          </Avatar>
                        }
                        title={users[randomIndex].displayName}
                        subheader={users[randomIndex].roles}
                      />
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton>
                        <ForumIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography
                          variant="h6"
                          color={"#1565c0"}
                          fontWeight={"bold"}
                        >
                          Description:
                        </Typography>
                        <Typography variant="body1">{m.description}</Typography>
                        <Typography
                          variant="h6"
                          color={"#1565c0"}
                          fontWeight={"bold"}
                        >
                          Timeline:
                        </Typography>
                        <Typography variant="body1">
                          {`Create Date: ${m.createDate.toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          )}`}
                          <br />
                          {`Start Date: ${m.startDate.toLocaleString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}`}
                          <br />
                          {`End Date: ${m.endDate.toLocaleString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}`}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                );
              })}
          </Box>
        </Grid>

        <Grid item xs={3}>
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
              Resolved:{" "}
              {
                missions.filter(
                  (mission) => mission.state === MissionStates.Resolved
                ).length
              }
              /{missions.length}
            </Typography>

          <Box
            sx={{
              padding: "20px",
              marginBottom: "20px",
              backgroundColor: "#efcead",
              borderStyle: "solid",
              borderRadius: "5px",
              borderColor: "#443e3e",
              overflow: "auto",
              height: 600,
            }}
          >

            {missions
              .filter((m) => m.state === MissionStates.Resolved)
              .map((m, i) => {
                const randomIndex = Math.floor(Math.random() * (3 - 0)) + 0;
                return (
                  <Card
                    sx={{
                      maxWidth: 345,
                      marginBottom: "10px",
                      bgcolor: "#ffe8e6",
                      borderStyle: "solid",
                      borderRadius: "10px",
                      borderColor: "#1565c0",
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "#1565c0" }} variant="rounded">
                          <AssignmentIcon />
                        </Avatar>
                      }
                      action={
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={m.title}
                      subheader={`State: ${states[m.state]}`}
                    />
                    <CardContent sx={{ padding: "0" }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: "#299740" }}>
                            <PersonIcon />
                          </Avatar>
                        }
                        title={users[randomIndex].displayName}
                        subheader={users[randomIndex].roles}
                      />
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton>
                        <ForumIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography
                          variant="h6"
                          color={"#1565c0"}
                          fontWeight={"bold"}
                        >
                          Description:
                        </Typography>
                        <Typography variant="body1">{m.description}</Typography>
                        <Typography
                          variant="h6"
                          color={"#1565c0"}
                          fontWeight={"bold"}
                        >
                          Timeline:
                        </Typography>
                        <Typography variant="body1">
                          {`Create Date: ${m.createDate.toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          )}`}
                          <br />
                          {`Start Date: ${m.startDate.toLocaleString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}`}
                          <br />
                          {`End Date: ${m.endDate.toLocaleString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}`}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                );
              })}
          </Box>
        </Grid>

        <Grid item xs={3}>
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
              Closed:{" "}
              {
                missions.filter(
                  (mission) => mission.state === MissionStates.Closed
                ).length
              }
              /{missions.length}
            </Typography>
            
          <Box
            sx={{
              padding: "20px",
              marginBottom: "20px",
              backgroundColor: "#efcead",
              borderStyle: "solid",
              borderRadius: "5px",
              borderColor: "#443e3e",
              overflow: "auto",
              height: 600,
            }}
          >

            {missions
              .filter((m) => m.state === MissionStates.Closed)
              .map((m, i) => {
                const randomIndex = Math.floor(Math.random() * (3 - 0)) + 0;
                return (
                  <Card
                    sx={{
                      maxWidth: 345,
                      marginBottom: "10px",
                      bgcolor: "#ffe8e6",
                      borderStyle: "solid",
                      borderRadius: "10px",
                      borderColor: "#1565c0",
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "#1565c0" }} variant="rounded">
                          <AssignmentIcon />
                        </Avatar>
                      }
                      action={
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={m.title}
                      subheader={`State: ${states[m.state]}`}
                    />
                    <CardContent sx={{ padding: "0" }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: "#299740" }}>
                            <PersonIcon />
                          </Avatar>
                        }
                        title={users[randomIndex].displayName}
                        subheader={users[randomIndex].roles}
                      />
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton>
                        <ForumIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography
                          variant="h6"
                          color={"#1565c0"}
                          fontWeight={"bold"}
                        >
                          Description:
                        </Typography>
                        <Typography variant="body1">{m.description}</Typography>
                        <Typography
                          variant="h6"
                          color={"#1565c0"}
                          fontWeight={"bold"}
                        >
                          Timeline:
                        </Typography>
                        <Typography variant="body1">
                          {`Create Date: ${m.createDate.toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          )}`}
                          <br />
                          {`Start Date: ${m.startDate.toLocaleString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}`}
                          <br />
                          {`End Date: ${m.endDate.toLocaleString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}`}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                );
              })}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default MissionBoardPage;
