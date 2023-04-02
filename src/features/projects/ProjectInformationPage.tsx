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

const projects: Project[] = [
  {
    id: "project1",
    createDate: new Date(2023, 7, 12),
    name: "Healthy and Balance",
    title: "Life",
    description: "Happiness",
    groupName: "hello-group"
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

      <ProjectForm />

      <TextField
        id="title-outlined-basic"
        label="Process"
        name="title"
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
        id="text-outlined-basic"
        label="Text"
        name="processDescription"
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
    </Box>
  );
};
export default ProjectInformation;
