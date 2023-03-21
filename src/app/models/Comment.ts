import AppUser from "./AppUser";
import Mission from "./Mission";

export default interface Comments {
    content : string,
    postDate: Date,
    updateDate: Date,
    missionId: string,
    mission: Mission,
    owner: AppUser,
}