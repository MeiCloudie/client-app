import {
    Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from '@mui/icons-material/Home';

const HelpPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Typography
        variant="h1"
        align="center"
        fontWeight={700}
        color={"#443e3e"}
        gutterBottom
      >
        Help Page
      </Typography>
      <Typography
        variant="h2"
        align="center"
        margin={1}
        fontWeight={700}
        color={"#1565c0"}
        gutterBottom
      >
        What can we do for you?
      </Typography>
      <TextField
        id="search-outlined-basic"
        variant="outlined"
        placeholder="Describe your problem"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
        sx={{ marginBottom: "20px" }}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight={600} color={"#1565c0"}>
            How to use this web?
          </Typography>
          <Typography variant="body1">
            Welcome to <strong>PlanTogether</strong>...
            <br />
            You can connect with your colleagues here to make the ideal project
            planner!
          </Typography>
          <Typography variant="body1">
            And you can:
            <ul style={{ paddingLeft: "50px" }}>
              <li>Manage Groups</li>
              <li>Manage Projects</li>
              <li>Manage Missions</li>
            </ul>
            <strong>Go to the HOME PAGE to get started!</strong>
          </Typography>
          <Button variant="contained" startIcon={<HomeIcon />} href="/home">
            Home
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight={600} color={"#1565c0"}>
            Contact us
          </Typography>
          <Typography variant="body1">
            If you have any questions or concerns, please contact us at
            plantogether@gmail.com!
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HelpPage;
