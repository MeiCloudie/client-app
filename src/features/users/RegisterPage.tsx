import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import EmailIcon from "@mui/icons-material/Email";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "./form/RegisterForm";
import { useStore } from "../../app/stores/store";

const RegisterPage = () => {
  const store = useStore()
  const navigate = useNavigate()
  React.useEffect(() => {
    if (store.userStore.isLoggedIn) navigate('/')
  })

  return (
    <Box sx ={{margin: "70px"}}>
      <Grid
        container
        columns={16}
        sx={{
          borderStyle: "solid",
          borderColor: "#443e3e",
          borderRadius: "5px",
        }}
      >
        <Grid
          item
          xs={8}
          sx={{
            bgcolor: "#eed2b4",
            borderRight: "solid",
            borderColor: "#443e3e",
          }}
        >
          <Box sx={{ margin: "300px 100px" }}>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: "#9098e1", margin: "0" }}
              gutterBottom
            >
              WELCOME TO
            </Typography>
            <Typography
              variant="h2"
              fontWeight={800}
              sx={{ color: "#f1b590", textShadow: "0.1em 0.1em 0.05em #5382e5", margin: "0" }}
              gutterBottom
            >
              PLANTOGETHER
            </Typography>
            <Typography variant="h5" sx={{ color: "#776b62" }} gutterBottom>
              You can connect with your colleagues here
              <br />
              to make the ideal project planner!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <RegisterForm />

        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterPage;
