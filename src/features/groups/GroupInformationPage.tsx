import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate, useParams } from "react-router-dom";
import { GroupFormValues } from "../../app/models/Group";
import React from "react";
import { useStore } from "../../app/stores/store";
import { Formik } from "formik";
import LoadingComponent from "../../app/layout/LoadingComponent";
import * as Yup from 'yup';

const GroupInformationPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { groupStore, userStore } = useStore()
  const [groupValues, setGroupValues] = React.useState<GroupFormValues>(new GroupFormValues())
  const handleForSubmit = (group: GroupFormValues) => {
    group.userName = userStore.currentUser?.userName
    group.id
      ? groupStore.updateGroup(group.id, group)
        .then(() => {
          group.name === params.groupName
            ? window.location.reload()
            : navigate(`/${group.name}/info`)
        })
      : groupStore.createGroup(group).then(() => navigate(`/${group.name}/info`))
  }
  const validationSchema = Yup.object({
    title: Yup.string().required("The title is required"),
    name: Yup.string()
      .matches(/^[a-z0-9-]+$/, "The name is invalid!")
      .required("The name is required"),
    description: Yup.string().required()
  })
  React.useEffect(() => {
    if (params.groupName)
      groupStore.loadGroup(params.groupName).then((group) => {
        setGroupValues(new GroupFormValues(group))
      })
  }, [])
  if (groupStore.isLoading) return <LoadingComponent />
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
        Group Information
      </Typography>
      <Formik
        key={groupValues.name}
        initialValues={groupValues}
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
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              helperText={errors.name}
              id="name-outlined-basic"
              label="Group Name"
              variant="outlined"
              placeholder="Enter group name here!"
              name="name"
              defaultValue={values.name}
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
              helperText={errors.title}
              id="title-outlined-basic"
              label="Group Title"
              variant="outlined"
              placeholder="Enter group title here!"
              name="title"
              defaultValue={values.title}
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
              helperText={errors.description}
              id="description-outlined-multiline-static"
              label="Description"
              multiline
              placeholder="Write some description here..."
              rows={4}
              name="description"
              defaultValue={values.description}
              onChange={handleChange}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Stack spacing={2} direction="row">
                <Button variant="contained">Cancel</Button>
                <Button type="submit" disabled={isSubmitting} variant="contained">Save</Button>
              </Stack>
            </div>
          </Box>
        )}
      </Formik>

    </Box>
  );
};

export default GroupInformationPage;
