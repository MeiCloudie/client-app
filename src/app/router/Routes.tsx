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
import MissionListPersonalPage from "../../features/missions/MissionListPersonalPage";
import GroupInformationPage from "../../features/groups/GroupInformationPage";
import GroupMembersPage from "../../features/groups/GroupMembersPage";
import ProjectInformationPage from "../../features/projects/ProjectInformationPage";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                // {
                //     element: <RequireAuth />, children: [

                //     ]
                // },
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
                            path: "create",
                            element: <GroupDetailsPage />,
                        },
                        {
                            path: "info",
                            element: <GroupInformationPage />,
                        },
                        {
                            path: "members",
                            element: <GroupMembersPage />,
                        },
                        {
                            path: ":projectName",
                            children: [
                                {
                                    path: "",
                                    element: <ProjectDetailsPage />
                                },
                                {
                                    path: "create",
                                    element: <ProjectDetailsPage />
                                },
                                {
                                    path: "info",
                                    element: <ProjectInformationPage />
                                },
                                {
                                    path: "missions",
                                    children: [
                                        {
                                            path: "",
                                            element: <MissionListPage /> 
                                        },
                                        {
                                            path: "create",
                                            element: <MissionDetailsPage /> 
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
                    element: <MissionListPersonalPage />
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

// export const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <App />,
//       children: [
//         {
//           element: <RequireAuth />,
//           children: [
//             {
//               path: "profiles/:userName",
//               element: <ProfilePage />,
//             },
//             {
//               path: "settings",
//               element: <SettingsPage />,
//             },
//             {
//               path: ":groupName",
//               children: [
//                 {
//                   path: "",
//                   element: <GroupDetailsPage />,
//                 },
//                 {
//                   path: "create",
//                   element: <GroupDetailsPage />,
//                 },
//                 {
//                   path: "info",
//                   element: <GroupInformationPage />,
//                 },
//                 {
//                   path: "members",
//                   element: <GroupMembersPage />,
//                 },
//                 {
//                   path: ":projectName",
//                   children: [
//                     {
//                       path: "",
//                       element: <ProjectDetailsPage />,
//                     },
//                     {
//                       path: "create",
//                       element: <ProjectDetailsPage />,
//                     },
//                     {
//                       path: "info",
//                       element: <ProjectInformationPage />,
//                     },
//                     {
//                       path: "missions",
//                       children: [
//                         {
//                           path: "",
//                           element: <MissionListPage />,
//                         },
//                         {
//                           path: "create",
//                           element: <MissionDetailsPage />,
//                         },
//                         {
//                           path: ":missionId",
//                           element: <MissionDetailsPage />,
//                         },
//                       ],
//                     },
//                     {
//                       path: "boards",
//                       children: [
//                         {
//                           path: "",
//                           element: <MissionBoardPage />,
//                         },
//                         {
//                           path: ":missionId",
//                           element: <MissionDetailsPage />,
//                         },
//                       ],
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               path: "personal",
//               element: <MissionListPersonalPage />,
//             },
//             {
//               path: "help",
//               element: <HelpPage />,
//             },
//             {
//               path: "about-us",
//               element: <AboutUsPage />,
//             },
//             {
//               path: "error",
//               element: <ErrorPage />,
//             },
//             {
//               path: "*",
//               element: <Navigate replace to="error" />,
//             },
//           ],
//         },
//       ],
//     },
//     {
//       path: "",
//       element: <Navigate replace to="home" />,
//     },
//     {
//       path: "home",
//       element: <HomePage />,
//     },
//     {
//       path: "login",
//       element: <LoginPage />,
//     },
//     {
//       path: "register",
//       element: <RegisterPage />,
//     },
//   ]);