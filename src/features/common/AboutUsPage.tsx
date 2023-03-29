import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SchoolIcon from "@mui/icons-material/School";
import Face3Icon from "@mui/icons-material/Face3";
import Face6Icon from "@mui/icons-material/Face6";

//import { image } from '../../../src/images/ithutechopenday.jpg'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const AboutUsPage = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Typography
        variant="h1"
        fontWeight={600}
        color={"#443e3e"}
        textAlign={"center"}
      >
        About Us
      </Typography>
      <Card
        sx={{
          bgcolor: "#eed2b4",
          borderColor: "#443e3e",
          borderStyle: "solid",
          borderRadius: "15px",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#1565c0" }} aria-label="students">
              <SchoolIcon />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Web Programming Project"
          subheader="HUTECH"
        />
        <CardMedia component="img" image="ithutechopenday.jpg" alt="Members" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Developing a website to facilitate effective teamwork planning and
            collaboration.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon sx={{ color: "#e87680" }} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon sx={{ color: "#1565c0" }} />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: "#e36348" }}>
                <Face6Icon />
              </Avatar>
              <Typography variant="body1">
                <strong>Nguyen Hong Thai</strong>
                <br />
                2080600914
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: "#e36348" }}>
                <Face3Icon />
              </Avatar>
              <Typography variant="body1">
                <strong>Truong Thuc Van</strong>
                <br />
                2080600803
              </Typography>
            </Stack>
            <Typography paragraph>
              <br />
              <strong>Class:</strong> 20DTHD3
            </Typography>
            <Typography paragraph>
              <strong>University:</strong> Ho Chi Minh City University of
              Technology
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default AboutUsPage;
