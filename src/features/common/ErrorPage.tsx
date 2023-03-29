import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Divider, Stack, Typography } from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';

const ErrorPage = () => {
  return (
    <div>
      <Box>
        <Grid
          container
          spacing={7}
          columns={16}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs={7} sx={{ textAlign: "right" }}>
            <Typography
              variant="h1"
              sx={{ fontSize: 300, fontWeight: 550, color: "#443e3e" }}
            >
              404
            </Typography>
          </Grid>
          <Divider orientation="vertical" variant="middle" sx = {{ height: 300 }} />
          <Grid xs={7}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 550, color: "#1565c0" }}>
              SORRY!
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 550, color: "#443e3e" }}>
              The Page You're Looking For
              <br />
              Was Not Found...
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2} direction="row">
          <Button variant="contained" startIcon={<HomeIcon />}>
            Home
          </Button>
          <Button variant="contained" startIcon={<HelpIcon />}>
            Help
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default ErrorPage;
