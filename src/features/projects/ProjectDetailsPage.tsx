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
import { useParams } from "react-router-dom";
import LinkButton from "../../app/common/button/LinkButton";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";

const ProjectDetailsPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const params = useParams();
  const [project, setProject] = React.useState<Project>(new Project())
  const { projectStore } = useStore()

  React.useEffect(() => {
    if (params.projectName)
      projectStore.loadProject(params.projectName).then((p) => {
        if (p) projectStore.loadProcesses().then(() => {
          if (projectStore.selectedProject) setProject(projectStore.selectedProject)
        })
        
      })
  }, [params.projectName])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  if (projectStore.isLoading) return <LoadingComponent />
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
          {project.title}
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
          <LinkButton
            label="Missions"
            to={`/${params.groupName}/${params.projectName}/missions`}
            icon={<AssignmentIcon />}
          />
          <LinkButton
            label="Boards"
            to={`/${params.groupName}/${params.projectName}/boards`}
            icon={<DashboardCustomizeIcon />}
          />

          <LinkButton
            label="Edit Project"
            to={`/${params.groupName}/${params.projectName}/info`}
            icon={<EditIcon />}
          />
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
          {project.description}
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
          Processes:
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
            {project.processes && project.processes.map((process, index) => (
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
                        {project.processes && index === project.processes.length - 1 ? "Finish" : "Continue"}
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
          {project.processes && activeStep === project.processes.length && (
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
