import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import Profile from "../../app/models/Profile";

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
          <Button variant="contained">Cancel</Button>
          <Button variant="contained">Save</Button>
        </Stack>
      </div>
    </Box>
  );
};

export default ProfilePage;
