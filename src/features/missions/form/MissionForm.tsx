import * as React from "react";

import { Formik } from "formik";
import { MissionFormValues } from "../../../app/models/Mission";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { MissionPriorities } from "../../../app/enums/MissionPriorities";
import { MissionStates } from "../../../app/enums/MissionStates";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import MySelectionForm from "../../../app/common/form/MySelectionForm";
import MyDateForm from "../../../app/common/form/MyDateForm";

const prioritySelection = [
  {
    value: MissionPriorities.Low,
    label: "Low",
  },
  {
    value: MissionPriorities.Medium,
    label: "Medium",
  },
  {
    value: MissionPriorities.High,
    label: "High",
  },
];

const stateSelection = [
  {
    value: MissionStates.New,
    label: "New",
  },
  {
    value: MissionStates.Active,
    label: "Active",
  },
  {
    value: MissionStates.Resolved,
    label: "Resolved",
  },
  {
    value: MissionStates.Closed,
    label: "Closed",
  },
];

const MissionForm = observer(() => {
  const navigate = useNavigate();
  const [mission, setMission] = React.useState<MissionFormValues>(
    new MissionFormValues()
  );
  const { missionId } = useParams<{ missionId: string }>();
  const handleForSubmit = (mission: MissionFormValues) => {
    missionId
      ? missionStore.updateMission(missionId, mission).then(() => navigate(`/`))
      : missionStore.createMission(mission).then(() => navigate(`/`));
  };
  const { missionStore } = useStore();
  const { loadMission } = missionStore;

  const validationSchema = Yup.object({
    title: Yup.string().required("The title is required"),
    projectName: Yup.string()
      .matches(/^[a-z0-9-]+$/, "message!")
      .required("The project is required"),
    priority: Yup.mixed<MissionPriorities>().required(),
    state: Yup.mixed<MissionStates>().required()
  });

  React.useEffect(() => {
    if (missionId)
      loadMission(missionId).then((m) => {
        setMission(new MissionFormValues(m));
      });
  }, []);

  return (
    <Formik
      key={mission.id}
      initialValues={mission}
      onSubmit={handleForSubmit}
      validationSchema={validationSchema}
    >
      {({ values, errors, handleSubmit, handleChange }) => (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { mt: 1, mb: 1, width: "100ch" },
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            helperText={errors.projectName}
            key={values!.id}
            name="projectName"
            id="project-name-outlined-basic"
            label="Project Name"
            variant="outlined"
            placeholder="Enter project name here!"
            defaultValue={values!.projectName}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* {errors.projectName} */}
          <TextField
            helperText={errors.title}
            key={values!.id}
            name="title"
            id="title-outlined-basic"
            label="Title"
            variant="outlined"
            placeholder="Enter title here!"
            defaultValue={values!.title}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* {errors.title} */}


          <MySelectionForm
            id="priority-select"
            defaultValue={values.priority}
            label="Priority"
            name="priority"
            onChange={handleChange}
            icon={<BookmarkIcon />} options={prioritySelection} />

          <MySelectionForm
            id="state-select"
            defaultValue={values.state}
            label="State"
            name="state"
            onChange={handleChange}
            icon={<CheckBoxIcon />} options={stateSelection} />

          <TextField
            helperText={errors.description}
            id="description-outlined-multiline-static"
            label="Description"
            multiline
            placeholder="Write some description here..."
            defaultValue={values.description}
            onChange={handleChange}
            name="description"
            rows={4}
          />

          <MyDateForm
            id="start-date-outlined-basic"
            label="Start Date"
            variant="outlined"
            placeholder="Hours"
            defaultValue={values.startDate}
            onChange={handleChange}
            name="startDate"
            icon={<AccessTimeFilledIcon />}
          />
          <MyDateForm
            id="end-date-outlined-basic"
            label="End Date"
            variant="outlined"
            placeholder="Hours"
            defaultValue={values.endDate}
            onChange={handleChange}
            name="endDate"
            icon={<AccessTimeFilledIcon />}
          />
          <MyDateForm
            id="completed-outlined-basic"
            label="Completed"
            variant="outlined"
            placeholder="Hours"
            defaultValue={values.completedDate}
            onChange={handleChange}
            name="completedDate"
            icon={<AccessTimeFilledIcon />}
          />
          
          {/* <TextField
            id="start-date-outlined-basic"
            label="Start Date"
            variant="outlined"
            placeholder="Hours"
            defaultValue={values.startDate}
            onChange={handleChange}
            name="startDate"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeFilledIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="end-date-outlined-basic"
            label="End Date"
            variant="outlined"
            placeholder="Hours"
            defaultValue={values.endDate}
            onChange={handleChange}
            name="endDate"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeFilledIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="completed-outlined-basic"
            label="Completed"
            variant="outlined"
            placeholder="Hours"
            defaultValue={values.completedDate}
            onChange={handleChange}
            name="completedDate"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeFilledIcon />
                </InputAdornment>
              ),
            }}
          /> */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            <Stack spacing={2} direction="row">
              <Button variant="contained">Cancel</Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Stack>
          </div>
        </Box>
      )}
    </Formik>
  );
});
export default MissionForm;
