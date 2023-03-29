import { createBrowserRouter, Navigate } from "react-router-dom";
import AboutUsPage from "../../features/common/AboutUsPage";
import ErrorPage from "../../features/common/ErrorPage";
import GroupDetailsPage from "../../features/groups/GroupDetailsPage";
import HomePage from "../../features/home/HomePage";
import MissionListPage from "../../features/missions/MissionListPage";
import ProjectDetailsPage from "../../features/projects/ProjectDetailsPage";
import HelpPage from "../../features/common/HelpPage";
import LoginPage from "../../features/users/LoginPage";
import ProfilePage from "../../features/users/ProfilePage";
import SettingsPage from "../../features/users/SettingsPage";
import RegisterPage from "../../features/users/RegisterPage";
import App from "../layout/App";
import MissionBoardPage from "../../features/missions/MissionBoardPage";
import MissionDetailsPage from "../../features/missions/MissionDetailsPage";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "",
                    element: <Navigate replace to="home" />,
                },
                {
                    path: "login",
                    element: <LoginPage />,
                },
                {
                    path: "register",
                    element: <RegisterPage />,
                },
                {
                    path: "home",
                    element: <HomePage />,
                },
                {
                    path: "profiles/:userName",
                    element: <ProfilePage />,
                },
                {
                    path: "settings",
                    element: <SettingsPage />,
                },
                {
                    path: ":groupName",
                    children: [
                        {
                            path: "",
                            element: <GroupDetailsPage />,
                        },
                        {
                            path: ":projectName",
                            children: [
                                {
                                    path: "",
                                    element: <ProjectDetailsPage />
                                },
                                {
                                    path: "missions",
                                    children: [
                                        {
                                            path: "",
                                            element: <MissionListPage /> 
                                        },
                                        {
                                            path: ":missionId",
                                            element: <MissionDetailsPage /> 
                                        },
                                    ],
                                },
                                {
                                    path: "boards",
                                    children: [
                                        {
                                            path: "",
                                            element: <MissionBoardPage />
                                        },
                                        {
                                            path: ":missionId",
                                            element: <MissionDetailsPage />
                                        }
                                    ]
                                },
                            ],
                        },
                    ],
                },
                {
                    path: "personal",
                    children: [
                        {
                            path: "missions",
                            element: <MissionListPage />
                        },
                        {
                            path: "boards",
                            element: <MissionBoardPage />
                        }
                    ]
                },
                {
                    path: "help",
                    element: <HelpPage />,
                },
                {
                    path: "about-us",
                    element: <AboutUsPage />,
                },
                {
                    path: "error",
                    element: <ErrorPage />,
                },
                {
                    path: "*",
                    element: <Navigate replace to="error" />,
                },
            ],
        },
    ]
)