import Mission from "../models/Mission";

export default class MissionStore {
    missions: Mission[] = new Array<Mission>()
    selectedMission: Mission | undefined = undefined

}