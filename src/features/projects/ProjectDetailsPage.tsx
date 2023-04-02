import * as React from "react";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";

import { Project } from "../../app/models/Project";

import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import EditIcon from "@mui/icons-material/Edit";
import { Process } from "../../app/models/Process";

const projects: Project[] = [
  {
    id: "project2",
    createDate: new Date(2023, 1, 1),
    name: "study-plan",
    title: "Study Plan",
    description: "Effective study plan and healthy balance",
  },
];

const processes: Process[] = [
  {
    title: "First process",
    description: "Some text here... Some text here...",
    isDone: false,
    projectId: "project1",
    project: projects[0],
  },
  {
    title: "Second process",
    description: "Some text here...",
    isDone: true,
    projectId: "project1",
    project: projects[0],
  },
  {
    title: "Third process",
    description: "Some text here...",
    isDone: true,
    projectId: "project1",
    project: projects[0],
  },
];

const ProjectDetailsPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Typography
          variant="h1"
          gutterBottom
          style={{
            wordWrap: "break-word",
            margin: "10px 0",
            fontWeight: "bold",
            color: "#1565c0",
          }}
        >
          {projects[0].title}
        </Typography>
      </div>

      <Box
        sx={{
          padding: "20px",
          backgroundColor: "#efcead",
          borderStyle: "solid",
          borderRadius: "10px",
          borderColor: "#443e3e",
        }}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          style={{ padding: "10px 0", justifyContent: "left" }}
        >
          <Button variant="contained" startIcon={<AssignmentIcon />}>
            Missions
          </Button>
          <Button variant="contained" startIcon={<DashboardCustomizeIcon />}>
            Boards
          </Button>
          <Button variant="contained" startIcon={<EditIcon />}>
            Edit Project
          </Button>
        </Stack>

        <Typography
          variant="h5"
          gutterBottom
          style={{
            wordWrap: "break-word",
            margin: "10px 0",
            fontWeight: "bold",
            color: "#1565c0",
          }}
        >
          About this project:
        </Typography>

        <Typography
          variant="h4"
          gutterBottom
          style={{
            wordWrap: "break-word",
            margin: "0",
            color: "#443e3e",
          }}
        >
          {projects[0].description}
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
          style={{
            wordWrap: "break-word",
            margin: "10px 0",
            fontWeight: "bold",
            color: "#1565c0",
          }}
        >
          Process:
        </Typography>

        <Box
          sx={{
            bgcolor: "#f5e4d6",
            padding: "20px",
            borderRadius: "5px",
            borderStyle: "solid",
            borderColor: "#1565c0",
            overflow: "auto",
            maxHeight: 500,
          }}
        >
          <Stepper activeStep={activeStep} orientation="vertical">
            {processes.map((process, index) => (
              <Step key={process.title}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {process.title}
                </StepLabel>
                <StepContent>
                  <Typography>{process.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === processes.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === processes.length && (
            <Paper
              square
              elevation={0}
              sx={{ p: 3, bgcolor: "#efcead", borderRadius: "10px" }}
            >
              <Typography>All processes completed - you're finished</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box>
      </Box>
    </div>
  );
};
export default ProjectDetailsPage;
