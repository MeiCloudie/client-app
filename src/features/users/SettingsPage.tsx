import * as React from "react";

import {
  AlertTitle,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ChangePasswordForm from "./form/ChangePasswordForm";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SettingsPage = () => {


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

      <ChangePasswordForm />
    </Box>
  );
};

export default SettingsPage;
