import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import CachedIcon from "@mui/icons-material/Cached";

import { User } from "../../app/models/User";

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

const GroupMembersPage = () => {
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
        Group Members
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
          id="title-outlined-basic"
          label="Email / Username"
          variant="outlined"
          placeholder="Enter email or username here!"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PeopleAltIcon />
              </InputAdornment>
            ),
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Stack spacing={2} direction="row">
            <Button variant="contained" startIcon={<GroupAddIcon />}>
              Add Members
            </Button>
          </Stack>
        </div>

        <List
          sx={{
            width: "100%",
            bgcolor: "#ffeddf",
            borderRadius: "5px",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
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
                  <Avatar sx={{ bgcolor: "#443e3e" }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${u.displayName} [${u.roles}]`}
                  secondary={u.email}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Stack spacing={2} direction="row">
          <Button variant="contained">Cancel</Button>
          <Button variant="contained">Save</Button>
        </Stack>
      </div>
    </Box>
  );
};

export default GroupMembersPage;
