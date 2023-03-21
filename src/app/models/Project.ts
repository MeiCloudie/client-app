import Entity from "./Entity";

export default interface Project extends Entity {
    createDate: Date,
    name : string,
    title: string,
    description: string,
}