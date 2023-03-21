import AppUser from "./AppUser";
import Project from "./Project";

export default interface Group {
    name : string,
    title: string,
    description: string,
    ownerId: string,
    owner: AppUser,
    projects: Project[],
}