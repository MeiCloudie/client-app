import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Mission, MissionFormValues } from "../models/Mission";
import agent from "../api/agent";

export default class MissionStore {
  missions: Mission[] = new Array<Mission>();
  selectedMission: Mission | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.selectedMission,
      (mission) => {
        console.log("This is the mission: " + mission);
      }
    );
    reaction(
      () => this.missions,
      () => {
        console.log("Mission list change");
      }
    );
  }

  get missionList() {
    return this.missions;
  }

  loadMissions = async () => {
    try {
      const missions = await agent.Missions.list();
      runInAction(() => {
        this.missions = missions;
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadMission = async (id: string) => {
    try {
      const mission = await agent.Missions.details(id);
      runInAction(() => {
        this.selectedMission = mission;
      });
      return mission;
    } catch (error) {
      console.log(error);
    }
  };

  createMission = async (missionFormValues: MissionFormValues) => {
    try {
      await agent.Missions.create(missionFormValues);
      const newMission = new Mission(missionFormValues);
      runInAction(() => {
        this.selectedMission = newMission;
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateMission = async (id: string, missionFormValues: MissionFormValues) => {
    try {
      await agent.Missions.update(id, missionFormValues);
      const updateMission = new Mission(missionFormValues);
      runInAction(() => {
        this.selectedMission = updateMission;
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteMission = async (id: string) => {
    try {
      await agent.Missions.delete(id);
      runInAction(() => {
        this.selectedMission = undefined;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
