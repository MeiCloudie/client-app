import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardHeader, CardContent, Avatar } from "@mui/material";

import { observer } from "mobx-react-lite";
import MissionForm from "./form/MissionForm";

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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
        }}
      >
        <Card style={{ backgroundColor: "#f0c9a7", width: "100%" }}>
          <CardHeader
            avatar={
              <Avatar aria-label="user" style={{ backgroundColor: "#1565c0" }}>
                U
              </Avatar>
            }
            title="John Doe"
            subheader="March 26, 2023"
          />
          <CardContent>
            <Typography variant="body1">This is a comment.</Typography>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
});

export default MissionDetailsPage;
