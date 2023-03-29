import React from "react";
import {
  AlertTitle,
  Box,
  Button,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import AssignmentIcon from "@mui/icons-material/Assignment";

import Profile from "../../app/models/Profile";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const profiles: Profile[] = [
  {
    displayName: "Mei",
    email: "mei@gmail.com",
    userName: "mei",
  },
  {
    displayName: "Slime",
    email: "slime@gmail.com",
    userName: "slime",
  },
];

const ProfilePage = () => {
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleClick = () => {
    if (isSuccess) {
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
    }
    setOpen(true);
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

  return (
    <Box sx={{ pl: 40, "& > :not(style)": { m: 1, width: "100ch" } }}>
      <Typography
        variant="h3"
        gutterBottom
        style={{
          wordWrap: "break-word",
          margin: "10px",
          fontWeight: "bold",
          color: "#443e3e",
        }}
      >
        Your Profile
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
          id="username-outlined-basic"
          label="Username"
          variant="outlined"
          defaultValue={profiles[0].userName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AssignmentIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="display-name-outlined-basic"
          label="Display Name"
          variant="outlined"
          defaultValue={profiles[0].displayName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AssignmentIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="email-outlined-basic"
          label="Email"
          variant="outlined"
          defaultValue={profiles[0].email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AssignmentIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={handleClick}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleClick}>
            Save
          </Button>
        </Stack>

        {!isSuccess && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning">
              <AlertTitle>Warning</AlertTitle>
              Inappropriate or malformed data.
              <strong>Please check and re-enter!</strong>
            </Alert>
          </Snackbar>
        )}

        {isSuccess && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              <AlertTitle>Success</AlertTitle>
              Your profile has been updated successfully!
            </Alert>
          </Snackbar>
        )}
      </div>
    </Box>
  );
};

export default ProfilePage;
