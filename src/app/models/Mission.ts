import { MissionPriorities } from "../enums/MissionPriorities";
import { MissionStates } from "../enums/MissionStates";
import Entity from "./Entity";

export interface Mission extends Entity {
    title: string,
    description: string,
    priority: MissionPriorities,
    state: MissionStates,
    startDate: Date,
    endDate: Date,
    completedDate: Date,
    createDate: Date,
    projectName?: string
}

export class Mission implements Mission {
    id = ''
    title = ''
    description = ''
    priority = MissionPriorities.Low
    state = MissionStates.New
    startDate = new Date()
    endDate = new Date()
    completedDate = new Date()
    createDate = new Date()
    constructor(init?: MissionFormValues) {
        Object.assign(this, init)
    }
}

export class MissionFormValues {
    id?: string = undefined
    title?: string = undefined
    description: string = ''
    priority: MissionPriorities = MissionPriorities.Low
    state: MissionStates = MissionStates.New
    startDate: Date | null = null
    endDate: Date | null = null
    completedDate: Date | null = null
    createDate: Date = new Date()
    projectName?: string = ''
    
    constructor(mission?: Mission) {
        if (mission) {
            this.id = mission.id
            this.title = mission.title
            this.description = mission.description
            this.priority = mission.priority
            this.state = mission.state
            this.startDate = mission.startDate
            this.endDate = mission.endDate
            this.completedDate = mission.completedDate
            this.createDate = mission.createDate
            this.projectName = mission.projectName
        }
    }
}