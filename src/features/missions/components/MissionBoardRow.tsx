import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  IconButtonProps,
  Typography,
  styled,
} from "@mui/material";
import { Mission } from "../../../app/models/Mission";
import { MissionStates } from "../../../app/enums/MissionStates";
import ForumIcon from "@mui/icons-material/Forum";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";

const states = ["New", "Active", "Resolved", "Closed"];

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

interface MissionBoardRowProps {
  missionList: Mission[];
  rowType: MissionStates;
}

const MissionBoardRow = ({ missionList, rowType }: MissionBoardRowProps) => {
  const [expanded, setExpanded] = React.useState<Set<string>>(
    new Set<string>()
  );

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

  return (
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
        {states[rowType]}:{" "}
        {missionList.filter((m) => m.state === rowType).length}/
        {missionList.length}
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
        {missionList
          .filter((m) => m.state === rowType)
          .map((m, i) => {
            return (
              <Card
                key={i}
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
                {m.members && m.members.length > 0 && (
                  <CardContent sx={{ padding: "0" }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "#299740" }}>
                          <PersonIcon />
                        </Avatar>
                      }
                      title={m.members[0].displayName}
                      subheader={m.members[0].userName}
                    />
                  </CardContent>
                )}

                <CardActions disableSpacing>
                  <IconButton>
                    <ForumIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded.has(m.id)}
                    onClick={() => handleExpandClick(m.id)}
                    aria-expanded={expanded.has(m.id)}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded.has(m.id)} timeout="auto" unmountOnExit>
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
                      {`Create Date: ${m.createDate.toLocaleString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}`}
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
  );
};

export default MissionBoardRow;
