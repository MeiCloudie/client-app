import Entity from "./Entity";
import Member from "./Member";
import Project from "./Project";

export default interface Group extends Entity {
    name : string,
    title: string,
    description: string,
    owner: Member,
    projects: Project[],
}