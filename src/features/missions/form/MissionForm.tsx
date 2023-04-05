import * as React from "react";

import { Formik, FormikHelpers } from "formik";
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
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

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
import { User } from "../../../app/models/User";
import { Label } from "@mui/icons-material";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import MyTextForm from "../../../app/common/form/MyTextForm";
import LinkButton from "../../../app/common/button/LinkButton";

const users: User[] = [
  {
    displayName: "Mei",
    email: "mei@gmail.com",
    token: "meiToken",
    roles: ["Leader"],
  },
  {
    displayName: "Slime",
    email: "slime@gmail.com",
    token: "slimeToken",
    roles: ["Member"],
  },
  {
    displayName: "John",
    email: "john@example.com",
    token: "token123",
    roles: ["Member"],
  },
  {
    displayName: "Jane",
    email: "jane@example.com",
    token: "token456",
    roles: ["Member"],
  },
];

const userSelection = users.map((u) => {
  return {
    value: u.email,
    label: u.displayName,
  };
});

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
  const params = useParams();
  const navigate = useNavigate();
  const [mission, setMission] = React.useState<MissionFormValues>(
    new MissionFormValues()
  );
  const [userSelection, setUserSelection] = React.useState<
    { value: string; label: string }[]
  >([]);
  const { missionId } = useParams<{ missionId: string }>();
  const { groupStore, missionStore } = useStore();
  const { loadMission } = missionStore;

  const handleForSubmit = (
    mission: MissionFormValues,
    actions: FormikHelpers<MissionFormValues>
  ) => {
    mission.projectName = params.projectName;
    if (missionId) {
      const promises = [missionStore.updateMission(missionId, mission)];
      if (mission.assignUserName)
        promises.push(
          missionStore.addMember(missionId, mission.assignUserName)
        );
      Promise.all(promises).then(() => {
        window.location.reload();
      });
    } else
      missionStore
        .createMission(mission)
        .then(() =>
          navigate(`/${params.groupName}/${params.projectName}/missions`)
        );
  };

  const handleForDelete = () => {
    missionStore
      .deleteMission(missionId!)
      .then(() =>
        navigate(`/${params.groupName}/${params.projectName}/missions`)
      );
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("The title is required"),
    priority: Yup.mixed<MissionPriorities>().required(),
    state: Yup.mixed<MissionStates>().required(),
  });

  React.useEffect(() => {
    if (!missionId || !params.groupName) return;
    Promise.all([
      loadMission(missionId),
      groupStore.loadGroup(params.groupName),
    ]).then(([m]) => {
      if (!params.groupName) return;
      groupStore.loadMembers(params.groupName, true).then(() => {
        missionStore.loadMembers().then(() => {
          if (groupStore.selectedGroup)
            setUserSelection(
              groupStore.selectedGroup!.members.map((m) => {
                return { value: m.userName, label: m.displayName };
              })
            );
          setMission(
            new MissionFormValues(
              m,
              missionStore.selectedMission?.members[0].userName
            )
          );
        });
      });
    });
    if (missionId)
      loadMission(missionId).then((m) => {
        if (
          params.groupName &&
          (!groupStore.selectedGroup ||
            params.groupName !== groupStore.selectedGroup.name)
        ) {
          groupStore
            .loadGroup(params.groupName)
            .then(() => setMission(new MissionFormValues(m)));
        }
        groupStore.loadMembers(params.groupName!, true).then(() => {
          if (groupStore.selectedGroup)
            setUserSelection(
              groupStore.selectedGroup!.members.map((m) => {
                return { value: m.userName, label: m.displayName };
              })
            );
        });
      });
  }, []);

  return (
    <Formik
      key={mission.id}
      initialValues={mission}
      onSubmit={handleForSubmit}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        handleSubmit,
        handleChange,
        // setFieldValue,
        isSubmitting,
      }) => (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { mt: 1, mb: 1, width: "100ch" },
          }}
          onSubmit={handleSubmit}
        >
          {/* <TextField
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
          /> */}
          {/* {errors.projectName} */}
          <MyTextForm
            helperText={errors.title}
            label="Title"
            name="title"
            icon={<AssignmentIcon />}
            placeholder="Enter title here!"
          />
          {/* <TextField
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
          /> */}
          {/* {errors.title} */}

          {/* <FormControl fullWidth>
            <InputLabel id="assigned-to-select-label">Assigned To</InputLabel>
            <Select
              labelId="assigned-to-select-label"
              id="assigned-to-select"
              defaultValue={values.users}
              label="Assigned To"
              name="assigned-to"
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <BookmarkIcon />
                </InputAdornment>
              }
            >
              {userSelection.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          {mission.id && (
            <MySelectionForm
              id="assigned-to-select"
              defaultValue={values.assignUserName}
              label="Assigned To"
              name="assignUserName"
              onChange={handleChange}
              icon={<BookmarkIcon />}
              options={userSelection}
            />
          )}

          <MySelectionForm
            id="priority-select"
            defaultValue={values.priority}
            label="Priority"
            name="priority"
            onChange={handleChange}
            icon={<BookmarkIcon />}
            options={prioritySelection}
          />

          <MySelectionForm
            id="state-select"
            defaultValue={values.state}
            label="State"
            name="state"
            onChange={handleChange}
            icon={<CheckBoxIcon />}
            options={stateSelection}
          />
          <MyTextForm
            label="Description"
            name="description"
            multiline
            rows={4}
            placeholder="Write some description here..."
          />
          {/* <MyDateForm
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="Start Date"
                defaultValue={dayjs(values.startDate)}
                onChange={(value) => setFieldValue('startDate', value?.format('YYYY-MM-DDThh:mm:ssZ')!)}
              />
              
              <DateTimePicker
                label="End Date"
                defaultValue={dayjs(values.endDate)}
                onChange={handleChange}
              />
              <DateTimePicker
              
                label="Completed Date"
                defaultValue={dayjs(values.completedDate)}
                onChange={handleChange}
              />
            </DemoContainer>
          </LocalizationProvider> */}

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
              <LinkButton
                label="Leave"
                to={`/${params.groupName}/${params.projectName}/missions`}
              />
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Save
              </Button>
              {missionId && (
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
export default MissionForm;
