import * as React from "react";

import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";

import AssignmentIcon from "@mui/icons-material/Assignment";
import ModeIcon from "@mui/icons-material/Mode";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

import Process from "../../app/models/Process";
import Project from "../../app/models/Project";

const projects: Project[] = [
  {
    id: "project1",
    createDate: new Date(2023, 7, 12),
    name: "Healthy and Balance",
    title: "Life",
    description: "Happiness",
  },
];

const processes: Process[] = [
  {
    title: "First process",
    description: "Some text here...",
    isDone: false,
    projectId: "project1",
    project: projects[0],
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Process", width: 300 },
  { field: "text", headerName: "Description", width: 300 },
];

const rows = [
  { id: 1, title: processes[0].title, text: processes[0].description },
  { id: 2, title: processes[0].title, text: processes[0].description },
];

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
      <Box
        component="form"
        sx={{
          "& > :not(style)": { mt: 1, mb: 1, width: "100ch" },
        }}
        noValidate
        autoComplete="off"
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

        <TextField
          id="title-outlined-basic"
          label="Text"
          variant="outlined"
          placeholder="Enter text here!"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TextSnippetIcon />
              </InputAdornment>
            ),
          }}
        />

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          style={{ padding: "10px 0", justifyContent: "right" }}
        >
          <Button variant="contained" startIcon={<AddCircleIcon />}>
            Add Process
          </Button>
          <Button variant="contained" startIcon={<DeleteIcon />}>
            Remove Process
          </Button>
        </Stack>
        
      </Box>

      <Box sx={{ height: 400, borderStyle: "solid", borderRadius: "5px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{ background: "#f5e4d6" }}
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
export default ProjectInformation;
