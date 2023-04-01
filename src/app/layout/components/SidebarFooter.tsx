import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import React from "react";
import ApiIcon from '@mui/icons-material/Api';
import { Box, Typography } from "@mui/material";

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  collapsed?: boolean;
}

const StyledCollapsedSidebarFooter = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  color: white;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  /* background: #0098e5; */
`;

const codeUrl =
  "https://plantogetherdotnetapi.azurewebsites.net/swagger/ui/index";

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  collapsed,
}) => {
  const location = useLocation();
  const path = location.pathname;

  // Extract the page name from the path using regular expressions:
  // We use the match method of the path string to extract the first word after a forward slash (/).
  // We use a regular expression (/\/(\w+)/) to match any word characters (\w+) after a forward slash (\/).
  const match = path.match(/\/(\w+)/);
  const pageName = match ? match[1] : "Unknown Page";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: "20px",
      }}
    >
      {collapsed ? (
        <StyledCollapsedSidebarFooter href={codeUrl} target="_blank">
          <ApiIcon />
        </StyledCollapsedSidebarFooter>
      ) : (
        <Box sx={{ margin: "10px", textAlign: "center" }}>
          <Typography variant="subtitle2" gutterBottom>
            You are on {pageName} page
          </Typography>
        </Box>
      )}
    </div>
  );
};
