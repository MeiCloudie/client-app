import { createBrowserRouter, Navigate } from "react-router-dom";
import AboutUsPage from "../../features/AboutUsPage";
import ErrorPage from "../../features/common/ErrorPage";
import GroupDetailsPage from "../../features/groups/GroupDetailsPage";
import HomePage from "../../features/home/HomePage";
import BoardsPage from "../../features/missions/BoardPage";
import MissionListPage from "../../features/missions/MissionListPage";
import MissionPage from "../../features/missions/MissionPage";
import ProjectDetailsPage from "../../features/projects/ProjectDetailsPage";
import HelpPage from "../../features/users/HelpPage";
import LoginPage from "../../features/users/LoginPage";
import ProfilePage from "../../features/users/ProfilePage";
import SettingsPage from "../../features/users/SettingsPage";
import SignUpPage from "../../features/users/SignUpPage";
import App from "../layout/App";

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
                    path: "signup",
                    element: <SignUpPage />,
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
                                            element: <MissionPage /> 
                                        },
                                    ],
                                },
                                {
                                    path: "boards",
                                    children: [
                                        {
                                            path: "",
                                            element: <BoardsPage />
                                        },
                                        {
                                            path: ":missionId",
                                            element: <MissionPage />
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
                            element: <BoardsPage />
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