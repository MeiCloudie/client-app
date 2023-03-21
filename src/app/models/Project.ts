import Group from "./Group";
import Mission from "./Mission";
import Process from "./Process";
import ProjectUser from "./ProjectUser";

export default interface Project {
    name : string,
    title: string,
    description: string,
    group: Group,
    projectUsers: ProjectUser[],
    processes: Process[],
    missions: Mission[],
}