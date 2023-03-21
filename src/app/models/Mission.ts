import { MissionPriorities } from "../enums/MissionPriorities";
import { MissionStates } from "../enums/MissionStates";
import Entity from "./Entity";

export default interface Mission extends Entity {
    title: string,
    description: string,
    priority: MissionPriorities,
    state: MissionStates,
    startDate: Date,
    endDate: Date,
    completedDate: Date,
    createDate: Date,
}