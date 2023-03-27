import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";

const GroupInformationPage = () => {
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
          label="Group Name"
          variant="outlined"
          placeholder="Enter group name here!"
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

export default GroupInformationPage;
