
import { Box, Typography } from "@mui/material";

import ProjectForm from "./form/ProjectForm";
import ProcessForm from "./form/ProcessForm";
import { useParams } from "react-router-dom";

const ProjectInformation = () => {
  const params = useParams()
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
        Project Information
      </Typography>

      <ProjectForm />

      {params.projectName && <ProcessForm />}
      
    </Box>
  );
};
export default ProjectInformation;
