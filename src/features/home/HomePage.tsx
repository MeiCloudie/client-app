import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import GroupsIcon from "@mui/icons-material/Groups";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import { Group } from "../../app/models/Group";
import { Badge, Button, Chip, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useStore } from "../../app/stores/store";
import LinkButton from "../../app/common/button/LinkButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const HomePage = () => {
  const { userStore } = useStore();
  const [groups, setGroups] = React.useState<Group[]>([])
  const { groupStore } = useStore()
  React.useEffect(() => {
    groupStore.loadGroups().then(() => groupStore.loadProjectsForGroups().then(() => {
      setGroups(groupStore.groupList)
    }))
  }, [])

  return (
    <div>
      <div style={{ textAlign: "center", margin: "30px" }}>
        <Typography
          variant="h1"
          gutterBottom
          style={{
            wordWrap: "break-word",
            margin: "10px 0",
            fontWeight: "800",
            color: "#1565c0",
          }}
        >
          PLAN TOGETHER
        </Typography>

        <Typography
          variant="h4"
          gutterBottom
          style={{
            wordWrap: "break-word",
            fontWeight: "bold",
            color: "#443e3e",
          }}
        >
          Welcome! Let's start planning!
        </Typography>
      </div>

      {userStore.isLoggedIn ? (
        <div>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center", margin: "30px" }}>
            <LinkButton to="/profile" label="Profile" icon={<AccountCircleIcon />} />
            <LinkButton to="/groups/create" label="Create New Group" icon={<GroupAddIcon />} />
          </Stack>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {groups.map((g, index) => (
              <Grid item={true} xs={2} sm={4} md={4} key={index}>
                <Card
                  sx={{
                    margin: "10px",
                    bgcolor: "#ebdbce",
                    borderStyle: "solid",
                    borderColor: "#443e3e",
                    borderRadius: "10px",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="project">
                        <GroupsIcon />
                      </Avatar>
                    }
                    title={g.title}
                    subheader={g.owner!.role}
                  />
                  <CardContent>
                    <Stack direction="row" spacing={2}>
                      <Badge
                        badgeContent={g.projects.length}
                        max={99}
                        color="primary"
                      >
                        <Chip
                          icon={<BusinessCenterIcon />}
                          label="Project"
                          sx={{ fontWeight: "600" }}
                        />
                      </Badge>
                    </Stack>
                    <LinkButton to={`/${g.name}`} icon={<DoubleArrowIcon />} label="Group" sx={{ margin: "20px 0" }}/>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
          <Button variant="contained" href="/login">
            Login
          </Button>
          <Button variant="contained" href="/register">
            Register
          </Button>
        </Stack>
      )}
    </div>
  );
};

export default HomePage;
