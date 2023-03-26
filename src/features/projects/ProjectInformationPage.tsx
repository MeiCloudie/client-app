import * as React from "react";

import { Typography } from "@mui/material";

const ProjectInformation = () => {
  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          wordWrap: "break-word",
          margin: "0",
          fontWeight: "bold",
          color: "#443e3e",
          textAlign: "center",
        }}
      >
        Project Information
      </Typography>
    </div>
  );
};
export default ProjectInformation;
