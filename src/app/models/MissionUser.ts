import AppUser from "./AppUser";
import Mission from "./Mission";

export default interface MissionUser {
    missionId: string,
    mission: Mission,
    userId: string,
    user: AppUser,
}