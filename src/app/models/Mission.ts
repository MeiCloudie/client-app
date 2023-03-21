import { MissionPriorities } from "../enums/MissionPriorities";
import { MissionStates } from "../enums/MissionStates";
import MissionUser from "./MissionUser";
import Project from "./Project";

export default interface Mission {
    title: string,
    description: string,
    priority: MissionPriorities,
    state: MissionStates,
    startDate: Date,
    endDate: Date,
    completedDate: Date,
    projectId: string,
    project: Project,
    missionUsers: MissionUser[],
    comments: Comment[],
}