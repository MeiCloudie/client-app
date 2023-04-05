import * as React from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {
  Box,
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import LinkButton from "../../app/common/button/LinkButton";

const GroupDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = React.useState<Group>(new Group());
  const { groupStore } = useStore();

  React.useEffect(() => {
    if (params.groupName)
      groupStore.loadGroup(params.groupName).then(() => {
        if (groupStore.selectedGroup === undefined) navigate("/error");
        else {
          Promise.all([
            groupStore.loadProjects(groupStore.selectedGroup.name, true),
            groupStore.loadMembers(groupStore.selectedGroup.name, true),
          ]).then(() => {
            if (groupStore.selectedGroup) setGroup(groupStore.selectedGroup);
          });
        }
      });
  }, [params.groupName]);

  if (groupStore.isLoading) return <LoadingComponent />;

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
          <LinkButton
            label="Add Members"
            to={`/${params.groupName}/members`}
            icon={<GroupAddIcon />}
          />
          <LinkButton
            label="New Project"
            to={`/${params.groupName}/projects/create`}
            icon={<AddBoxRoundedIcon />}
          />
          <LinkButton
            label="Edit Group"
            to={`/${params.groupName}/info`}
            icon={<EditIcon />}
          />
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
          {group.members.map((u, i) => (
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#9196de" }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={u.displayName} secondary={u.role} />
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
          {group.projects &&
            group.projects.map((p, i) => (
              <ListItem
                key={i}
                secondaryAction={
                  <div>
                    <Link to={`/${group.name}/${p.name}`}>
                      <IconButton edge="end">
                        <MoreHorizIcon />
                      </IconButton>
                    </Link>
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
