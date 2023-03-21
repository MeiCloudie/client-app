import Group from "./Group";
import MissionUser from "./MissionUser";
import ProjectUser from "./ProjectUser";

export default interface AppUser {
    displayName: string,
    missionUsers: MissionUser[],
    projectUsers: ProjectUser[],
    groups: Group[],
    comments: Comment[],
}