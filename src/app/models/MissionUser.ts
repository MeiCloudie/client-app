import { Mission } from "./Mission";

export default interface MissionUser {
    missionId: string,
    mission: Mission,
    userId: string,
}