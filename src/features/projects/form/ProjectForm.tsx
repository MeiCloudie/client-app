import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectFormValues } from "../../../app/models/Project";
import React from "react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import {
  Box,
  InputAdornment,
  Button,
  Stack,
  TextField,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import LinkButton from "../../../app/common/button/LinkButton";

const ProjectForm = observer(() => {
  const params = useParams();
  const navigate = useNavigate();
  const [projectValues, setProjectValues] = React.useState<ProjectFormValues>(
    new ProjectFormValues()
  );
  const { projectName } = useParams();
  const { projectStore } = useStore();
  const { loadProject } = projectStore;

  const handleForSubmit = (project: ProjectFormValues) => {
    project.groupName = params.groupName
    project.id
      ? projectStore
          .updateProject(project.id, project)
          .then(() =>
            project.name === params.projectName
              ? window.location.reload()
              : navigate(`/${params.groupName}/${project.name}/info`)
          )
      : projectStore
          .createProject(project)
          .then(() => navigate(`/${params.groupName}/${project.name}/info`));
  };

  const handleForDelete = () => {
    projectStore
      .deleteProject(projectValues.id!)
      .then(() => navigate(`/${params.groupName}}`));
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("The title is required"),
    name: Yup.string()
      .matches(/^[a-z0-9-]+$/, "The name is invalid!")
      .required("The project name is required"),
    description: Yup.string().required()
  });

  React.useEffect(() => {
    if (projectName) {
      loadProject(projectName).then((p) => {
        setProjectValues(new ProjectFormValues(p));
      });
    }
  }, [projectName]);

  return (
    <Formik
      key={projectValues.name}
      initialValues={projectValues}
      onSubmit={handleForSubmit}
      validationSchema={validationSchema}
    >
      {({ values, errors, handleSubmit, handleChange, isSubmitting }) => (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { mt: 1, mb: 1, width: "100ch" },
          }}
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            id="project-name-outlined-basic"
            label="Project Name"
            variant="outlined"
            name="name"
            defaultValue={values.name}
            placeholder="Enter project name here!"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="project-title-outlined-basic"
            label="Project Title"
            variant="outlined"
            name="title"
            defaultValue={values.title}
            placeholder="Enter project name here!"
            onChange={handleChange}
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
            name="description"
            defaultValue={values.description}
            multiline
            onChange={handleChange}
            placeholder="Write some description here..."
            rows={4}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Stack spacing={2} direction="row">
              <LinkButton label="Leave" to={`/${params.groupName}/${params.projectName}`} />
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Save
              </Button>
              {projectName && (
                <Button variant="contained" onClick={handleForDelete}>
                  Delete
                </Button>
              )}
            </Stack>
          </div>
        </Box>
      )}
    </Formik>
  );
});

export default ProjectForm;
