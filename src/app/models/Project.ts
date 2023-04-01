import Entity from "./Entity";

export interface Project extends Entity {
    name : string,
    title: string,
    description: string,
    createDate: Date,
}

export class Project implements Project {
    name = ''
    title = ''
    description = ''
    createDate = new Date()
    constructor(init?: ProjectFormValues) {
        Object.assign(this, init)
    }
}

export class ProjectFormValues {
    id?: string = undefined
    name?: string = undefined
    title?: string = undefined
    description: string = ''
    createDate: Date = new Date()
    
    constructor(project?: Project) {
        if (project) {
            this.id = project.id
            this.name = project.name
            this.title = project.title
            this.description = project.description
            this.createDate = project.createDate
        }
    }
}
