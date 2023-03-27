import * as React from "react";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import LockIcon from "@mui/icons-material/Lock";

const SettingsPage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ pl: 40, "& > :not(style)": { m: 1, width: "100ch" } }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          wordWrap: "break-word",
          fontWeight: "bold",
          color: "#443e3e",
        }}
      >
        Settings
      </Typography>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { mt: 1, mb: 1, width: "100ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          variant="h5"
          gutterBottom
          style={{
            color: "#1565c0",
          }}
        >
          Change Password:
        </Typography>
        <FormControl sx={{ m: 0, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Current Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showCurrentPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowCurrentPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Current Password"
          />
        </FormControl>

        <FormControl sx={{ m: 0, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            New Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showNewPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="New Password"
          />
        </FormControl>

        <FormControl sx={{ m: 0, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Stack spacing={2} direction="row">
            <Button variant="contained">Change Password</Button>
          </Stack>
        </div>
      </Box>

      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          The current password is incorrect or the new password is not in the
          correct format. <strong>Please re-enter!</strong>
        </Alert>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Password change successfully!
        </Alert>
      </Stack>
    </Box>
  );
};

export default SettingsPage;
