import * as React from "react";

import {
  Box,
  Typography,
} from "@mui/material";

import ChangePasswordForm from "./form/ChangePasswordForm";

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
