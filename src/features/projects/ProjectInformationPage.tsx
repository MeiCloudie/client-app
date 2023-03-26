import * as React from "react";

import { Box, InputAdornment, TextField, Typography } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import ModeIcon from '@mui/icons-material/Mode';

const ProjectInformation = () => {
  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          wordWrap: "break-word",
          margin: "0",
          fontWeight: "bold",
          color: "#443e3e",
          textAlign: "center",
        }}
      >
        Project Information
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100ch" },
        }}
        noValidate
        autoComplete="off"
        style={{ textAlign: "center" }}
      >
        <TextField
          id="title-outlined-basic"
          label="Project Name"
          variant="outlined"
          placeholder="Enter project name here!"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AssignmentIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="description-outlined-multiline-static"
          label="Description"
          multiline
          placeholder="Write some description here..."
          rows={4}
        />

        <TextField
          id="title-outlined-basic"
          label="Process"
          variant="outlined"
          placeholder="Enter title here!"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ModeIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </div>
  );
};
export default ProjectInformation;
