import * as React from "react";
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
  AlertTitle,
  Snackbar,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import CachedIcon from "@mui/icons-material/Cached";

import { User } from "../../app/models/User";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { Group } from "../../app/models/Group";
import { observer } from "mobx-react-lite";
import { Formik } from "formik";
import Member from "../../app/models/Member";
import MyTextForm from "../../app/common/form/MyTextForm";
import LinkButton from "../../app/common/button/LinkButton";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const GroupMembersPage = observer(() => {
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = React.useState<Group>(new Group());
  const { groupStore } = useStore();
  const [members, setMembers] = React.useState<Member[]>([]);

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
            updateMembers();
          });
        }
      });
  }, [params.groupName]);

  const handleClick = (userName: string) => {
    groupStore.removeMember(params.groupName!, userName).then((isSuccess) => {
      if (isSuccess) {
        setIsSuccess(true);
        updateMembers();
      } else {
        setIsSuccess(false);
      }
      setOpen(true);
    });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const updateMembers = () =>
    groupStore.loadMembers(params.groupName!, true).then(() => {
      setMembers(groupStore.selectedGroup!.members);
    });

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

      <Formik
        initialValues={{ userName: "" }}
        onSubmit={({ userName }, actions) => {
          // groupStore.addMember(params.groupName!, userName);
          if (params.groupName)
            groupStore
              .addMember(params.groupName, userName)
              .then((isSuccess) => {
                if (isSuccess) {
                  setIsSuccess(true);
                  updateMembers();
                  actions.resetForm();
                } else {
                  setIsSuccess(false);
                }
                setOpen(true);
                actions.setSubmitting(false);
              });
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Box
            component="form"
            sx={{
              "& > :not(style)": { mt: 1, mb: 1, width: "100ch" },
            }}
            onSubmit={handleSubmit}
          >
            <MyTextForm
              label="Username"
              name="userName"
              placeholder="Enter username here!"
              icon={<PeopleAltIcon />}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Stack spacing={2} direction="row">
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<GroupAddIcon />}
                  disabled={isSubmitting}
                >
                  Add Members
                </Button>
              </Stack>
              {!isSuccess && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    Something went wrong!
                  </Alert>
                </Snackbar>
              )}
              {isSuccess && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Action successfully!
                  </Alert>
                </Snackbar>
              )}
            </div>
          </Box>
        )}
      </Formik>

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
        {members.map((u, i) => (
          <ListItem
            key={i}
            secondaryAction={
              <div>
                <IconButton edge="end">
                  <CachedIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => {
                    handleClick(u.userName);
                  }}
                >
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
              <ListItemText primary={u.displayName} secondary={u.role} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Stack spacing={2} direction="row">
          <LinkButton label="Leave" to={`/${params.groupName}`} />
          {/* <Button variant="contained" onClick={handleClick}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleClick}>
            Save
          </Button> */}
        </Stack>

        {/* {!isSuccess && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning">
              <AlertTitle>Warning</AlertTitle>
              The current password is incorrect or the new password is not in
              the correct format. <strong>Please re-enter!</strong>
            </Alert>
          </Snackbar>
        )}

        {isSuccess && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              <AlertTitle>Success</AlertTitle>
              Password change successfully!
            </Alert>
          </Snackbar>
        )} */}
      </div>
    </Box>
  );
});

export default GroupMembersPage;
