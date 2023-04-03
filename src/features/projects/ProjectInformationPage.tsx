import * as React from "react";

import { Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";

import { Process } from "../../app/models/Process";
import { Project } from "../../app/models/Project";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

import ProjectForm from "./form/ProjectForm";
import ProcessForm from "./form/ProcessForm";


const ProjectInformation = () => {
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
        Project Information
      </Typography>

      <ProjectForm />

      <ProcessForm />
      
    </Box>
  );
};
export default ProjectInformation;
