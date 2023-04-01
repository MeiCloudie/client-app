import { Project } from "./Project";

export default interface Process {
    title: string,
    description: string,
    isDone: boolean,
    projectId: string,
    project: Project,
}