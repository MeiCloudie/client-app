import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { observer } from "mobx-react-lite";
import MissionForm from "./form/MissionForm";

import CommentForm from "./form/CommentForm";

const MissionDetailsPage = observer(() => {
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
        Mission Details
      </Typography>

      <MissionForm />

        <CommentForm />
    </Box>
  );
});

export default MissionDetailsPage;
