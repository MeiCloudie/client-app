import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  menuClasses,
  MenuItemStyles,
} from "react-pro-sidebar";
import { Switch } from "./components/Switch";
import { SidebarHeader } from "./components/SidebarHeader";
import { SidebarFooter } from "./components/SidebarFooter";
import Typography from "@mui/material/Typography";

import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ImageIcon from "@mui/icons-material/Image";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DehazeIcon from "@mui/icons-material/Dehaze";

import { User } from "../models/User";
import { Group } from "../models/Group";
import { Box, Button } from "@mui/material";
import { useStore } from "../stores/store";

const user: User = {
  displayName: "Mei",
  email: "mei@gmail.com",
  token: "token1",
  roles: ["User"],
};



type Theme = "light" | "dark";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#fdcfa7",
      color: "#607489",
    },
    menu: {
      menuContent: "#fdcfa7",
      icon: "#443e3e",
      hover: {
        backgroundColor: "#fdd5b4",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#052040",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const Playground: React.FC = () => {
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();
  const navigate = useNavigate()
  const [hasImage, setHasImage] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<Theme>("light");
  const [user, setUser] = React.useState<User>(new User())

  // handle on theme change event
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  // handle on image change event
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasImage(e.target.checked);
  };
  const [groups, setGroups] = React.useState<Group[]>([])
  const { groupStore, userStore } = useStore()

  React.useEffect(() => {
    userStore.currentUser
      ? setUser(userStore.currentUser)
      : navigate('/')

    groupStore.loadGroups().then(() => {
      groupStore.loadProjectsForGroups().then(() => setGroups(groupStore.groupList))
    })
  }, [])

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "absolute",
        background: "#ede6cb",
      }}
    >
      <Sidebar
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        breakPoint="lg"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <SidebarHeader style={{ marginBottom: "24px", marginTop: "16px" }} />

          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem icon={<HomeIcon />} component={<Link to="/home" />}>
                Home
              </MenuItem>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                margin: "8px 0",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: collapsed ? 0 : 0.7,
                  letterSpacing: "0.5px",
                }}
              >
                Account
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <SubMenu label={user.displayName} icon={<AccountCircleIcon />}>
                <MenuItem
                  icon={<ManageAccountsIcon />}
                  component={<Link to={`/profile`} />}
                >
                  Your profile
                </MenuItem>
                <MenuItem
                  icon={<LockResetIcon />}
                  component={<Link to="/settings" />}
                >
                  Change password
                </MenuItem>
                <MenuItem
                  icon={<LogoutIcon />}
                  component={<Link to="/login" />}
                  onClick={userStore.logout}
                >
                  Log out
                </MenuItem>
              </SubMenu>
              <MenuItem
                icon={<SettingsIcon />}
                component={<Link to="/settings" />}
              >
                Settings
              </MenuItem>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                margin: "8px 0",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: collapsed ? 0 : 0.7,
                  letterSpacing: "0.5px",
                }}
              >
                Groups
              </Typography>
            </div>
            {groups.map((g, i) => (
              <Menu key={i} menuItemStyles={menuItemStyles}>
                <SubMenu label={g.title} icon={<Diversity3Icon />}>
                  <MenuItem
                    icon={<InfoIcon />}
                    component={<Link to={`/${g.name}/`} />}
                  >
                    Group Details
                  </MenuItem>
                  {g.projects && g.projects.map((p, j) => (
                    <SubMenu
                      key={j}
                      label={p.title}
                      icon={<BusinessCenterIcon />}
                    >
                      <MenuItem
                        icon={<InfoIcon />}
                        component={<Link to={`/${g.name}/${p.name}/`} />}
                      >
                        Project Details
                      </MenuItem>
                      <MenuItem
                        icon={<AssignmentIcon />}
                        component={
                          <Link to={`/${g.name}/${p.name}/missions/`} />
                        }
                      >
                        Missions
                      </MenuItem>
                      <MenuItem
                        icon={<DashboardIcon />}
                        component={
                          <Link to={`/${g.name}/${p.name}/boards/`} />
                        }
                      >
                        Boards
                      </MenuItem>
                    </SubMenu>
                  ))}
                </SubMenu>
              </Menu>
            ))}

            <div
              style={{
                padding: "0 24px",
                margin: "8px 0",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: collapsed ? 0 : 0.7,
                  letterSpacing: "0.5px",
                }}
              >
                Personal
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem
                icon={<AssignmentIndIcon />}
                component={<Link to="/personal" />}
              >
                Mission List
              </MenuItem>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                margin: "8px 0",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: collapsed ? 0 : 0.7,
                  letterSpacing: "0.5px",
                }}
              >
                Others
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem icon={<HelpIcon />} component={<Link to="/help" />}>
                Help
              </MenuItem>
              <MenuItem icon={<InfoIcon />} component={<Link to="/about-us" />}>
                About us
              </MenuItem>
              <MenuItem icon={<DarkModeIcon />}>
                <Switch
                  id="theme"
                  checked={theme === "dark"}
                  onChange={handleThemeChange}
                  label="Dark theme"
                />
              </MenuItem>
              <MenuItem icon={<ImageIcon />}>
                <Switch
                  id="image"
                  checked={hasImage}
                  onChange={handleImageChange}
                  label="Image"
                />
              </MenuItem>
            </Menu>
          </div>
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>

      <main
        style={{
          height: "100%",
          width: "100%",
          margin: 0,
          padding: 0,
          overflow: "auto",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", padding: "5px" }}
        >
          <Switch
            id="collapse"
            checked={collapsed}
            onChange={() => collapseSidebar()}
            label="Collapse"
          />
        </Box>

        <div
          style={{
            padding: "16px 24px",
            color: "#44596e",
            background: "#ede6cb",
            height: "100%",
            width: "100%",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <Button
                className="sb-button"
                variant="contained"
                onClick={() => toggleSidebar()}
              >
                <DehazeIcon />
              </Button>
            )}
          </div>

          <Outlet />
        </div>
      </main>
    </div>
  );
};
