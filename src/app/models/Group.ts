import Entity from "./Entity";
import Member from "./Member";
import { Project } from "./Project";

export interface Group extends Entity {
    name : string,
    title: string,
    description: string,
    owner?: Member,
    projects: Project[],
}

export class Group implements Group {
    name = ''
    title = ''
    description: string = ''
    projects: Project[] = []
    constructor(init?: GroupFormValues) {
        Object.assign(this, init)
    }
}

export class GroupFormValues {
    id?: string = ''
    name?: string = ''
    title?: string = ''
    description?: string =''
    userName?: string = ''
    constructor(group?: Group) {
        if (group && group.owner) {
            this.id = group.id
            this.name = group.name
            this.title = group.title
            this.description = group.description
            this.userName = group.owner.userName
        }
    }
}