import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import EmailIcon from "@mui/icons-material/Email";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box>
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
          <Box sx={{ margin: "100px", textAlign: "center" }}>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: "#9098e1", margin: "0" }}
              gutterBottom
            >
              REGISTER
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { margin: "10px 0", width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="email-outlined-basic"
                label="Email"
                variant="outlined"
                placeholder="Enter your email here!"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="username-outlined-basic"
                label="Username"
                variant="outlined"
                placeholder="Create your username here!"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="displayname-outlined-basic"
                label="Display Name"
                variant="outlined"
                placeholder="Create your display name here!"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl sx={{ m: 0, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <FormControl sx={{ m: 0, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
            </Box>
            <Button variant="contained" sx={{ margin: "20px" }}>
              Create Account
            </Button>
            <Typography variant="h6" gutterBottom>
              Already have an account? {""}
              <Link href="/login">Login</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterPage;
