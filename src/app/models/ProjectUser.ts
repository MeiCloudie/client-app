import { Project } from "./Project";

export default interface ProjectUser {
    projectId: string,
    project: Project,
    userId: string,
}