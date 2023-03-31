import React from "react";
import { Link, Outlet } from "react-router-dom";
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
import { Diamond } from "./icons/Diamond";
import { BarChart } from "./icons/BarChart";
import { Global } from "./icons/Global";
import { InkBottle } from "./icons/InkBottle";
import { Book } from "./icons/Book";
import { Calendar } from "./icons/Calendar";
import { ShoppingCart } from "./icons/ShoppingCart";
import { Service } from "./icons/Service";
import { SidebarFooter } from "./components/SidebarFooter";
import { Badge } from "./components/Badge";
// import { Typography } from "./components/Typography";
import Typography from "@mui/material/Typography";
import { PackageBadges } from "./components/PackageBadges";
import MissionListPage from "../../features/missions/MissionListPage";
import MissionDetailsPage from "../../features/missions/MissionDetailsPage";
import ProjectDetailsPage from "../../features/projects/ProjectDetailsPage";
import ProjectInformation from "../../features/projects/ProjectInformationPage";
import GroupDetailsPage from "../../features/groups/GroupDetailsPage";
import MissionListTestPage from "../../features/missions/MissionListTestPage";
import MissionBoardPage from "../../features/missions/MissionBoardPage";
import GroupInformationPage from "../../features/groups/GroupInformationPage";
import GroupMembersPage from "../../features/groups/GroupMembersPage";
import SettingsPage from "../../features/users/SettingsPage";
import ProfilePage from "../../features/users/ProfilePage";
import ErrorPage from "../../features/common/ErrorPage";
import AboutUsPage from "../../features/common/AboutUsPage";
import HelpPage from "../../features/common/HelpPage";
import HomePage from "../../features/home/HomePage";
import RegisterPage from "../../features/users/RegisterPage";
import LoginPage from "../../features/users/LoginPage";

import User from "../models/User";
import Group from "../models/Group";

const user: User = {
  displayName: "Mei",
  email: "mei@gmail.com",
  token: "token1",
  roles: ["User"],
};

const groups: Group[] = [
  {
    id: "group1",
    name: "owl",
    description: "Team owl",
    title: "Group Owl",
    owner: {
      userName: "Mei",
      displayName: "Van",
      role: "Leader",
    },
    projects: [
      {
        id: "project1",
        createDate: new Date(2023, 1, 1),
        name: "study-plan",
        title: "Study Plan",
        description: "Effective study plan and healthy balance",
      },
      {
        id: "project2",
        createDate: new Date(2023, 7, 12),
        name: "Healthy and Balance",
        title: "Life",
        description: "Happiness",
      },
    ],
  },
  {
    id: "group2",
    name: "abc",
    description: "Team abc",
    title: "Group Abc",
    owner: {
      userName: "Mei",
      displayName: "Van",
      role: "Member",
    },
    projects: [
      {
        id: "project1",
        createDate: new Date(2023, 1, 1),
        name: "study-plan",
        title: "Study Plan",
        description: "Effective study plan and healthy balance",
      },
    ],
  },
];

type Theme = "light" | "dark";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
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

  const [isRTL, setIsRTL] = React.useState<boolean>(false);
  const [hasImage, setHasImage] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<Theme>("light");

  // handle on RTL change event
  const handleRTLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRTL(e.target.checked);
  };

  // handle on theme change event
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  // handle on image change event
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasImage(e.target.checked);
  };

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
        direction: isRTL ? "rtl" : "ltr",
        position: "absolute",
        background: "#ede6cb",
      }}
    >
      <Sidebar
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        rtl={isRTL}
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
              <MenuItem icon={<Book />} component={<Link to="/" />}>
                Home
              </MenuItem>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                marginBottom: "8px",
                marginTop: "32px",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}
              >
                Account
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <SubMenu label={user.displayName} icon={<Global />}>
                <MenuItem
                  icon={<Book />}
                  component={<Link to="/profiles/:userName" />}
                >
                  Your profile
                </MenuItem>
                <MenuItem icon={<Book />} component={<Link to="/settings" />}>
                  Change password
                </MenuItem>
                <MenuItem icon={<Book />} component={<Link to="/login" />}>
                  Log out
                </MenuItem>
              </SubMenu>
              <MenuItem icon={<Book />} component={<Link to="/settings" />}>
                Settings
              </MenuItem>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                marginBottom: "8px",
                marginTop: "32px",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}
              >
                Group
              </Typography>
            </div>
            {groups.map((g) => (
              <Menu menuItemStyles={menuItemStyles}>
                <SubMenu label={g.title} icon={<Global />}>
                  <MenuItem
                    icon={<Book />}
                    component={<Link to="/:groupName/" />}
                  >
                    Group Details
                  </MenuItem>
                  {g.projects.map((p) => (
                    <SubMenu label={p.title} icon={<Global />}>
                      <MenuItem
                        icon={<Book />}
                        component={<Link to="/:groupName/:projectName/" />}
                      >
                        Project Details
                      </MenuItem>
                      <MenuItem
                        icon={<Book />}
                        component={
                          <Link to="/:groupName/:projectName/missions/" />
                        }
                      >
                        Missions
                      </MenuItem>
                      <MenuItem
                        icon={<Book />}
                        component={
                          <Link to="/:groupName/:projectName/boards/" />
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
                marginBottom: "8px",
                marginTop: "32px",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}
              >
                Personal
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem icon={<Book />} component={<Link to="/personal" />}>
                Mission List
              </MenuItem>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                marginBottom: "8px",
                marginTop: "32px",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}
              >
                Others
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem icon={<Book />} component={<Link to="/help" />}>
                Help
              </MenuItem>
              <MenuItem icon={<Book />} component={<Link to="/about-us" />}>
                About us
              </MenuItem>
              <MenuItem icon={<Book />}>
                <Switch
                  id="theme"
                  checked={theme === "dark"}
                  onChange={handleThemeChange}
                  label="Dark theme"
                />
              </MenuItem>
              <MenuItem icon={<Book />}>
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
        <div
          style={{
            padding: "16px 24px",
            color: "#44596e",
            background: "#ede6cb",
            height: "100%",
            width: "100%",
          }}
        >
          <Outlet />

          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <button className="sb-button" onClick={() => toggleSidebar()}>
                Toggle
              </button>
            )}
          </div>
          <div style={{ marginBottom: "48px" }}>
            <Typography variant="h4" fontWeight={600}>
              React Pro Sidebar
            </Typography>
            <Typography variant="body2">
              React Pro Sidebar provides a set of components for creating high
              level and customizable side navigation
            </Typography>
            <PackageBadges />
          </div>

          <div style={{ padding: "0 8px" }}>
            <div style={{ marginBottom: 16 }}>
              <Switch
                id="collapse"
                checked={collapsed}
                onChange={() => collapseSidebar()}
                label="Collapse"
              />
            </div>

            {/* <div style={{ marginBottom: 16 }}>
              <Switch
                id="rtl"
                checked={isRTL}
                onChange={handleRTLChange}
                label="RTL"
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <Switch
                id="theme"
                checked={theme === "dark"}
                onChange={handleThemeChange}
                label="Dark theme"
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <Switch
                id="image"
                checked={hasImage}
                onChange={handleImageChange}
                label="Image"
              />
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};
