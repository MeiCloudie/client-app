import { createContext, useContext } from "react";
import MissionStore from "./missionStore";
import UserStore from "./userStore";
import ProjectStore from "./projectStore";
import GroupStore from "./groupStore";
import CommonStore from "./commonStore";

interface Store {
    missionStore: MissionStore,
    projectStore: ProjectStore,
    groupStore: GroupStore,
    userStore: UserStore,
    commonStore: CommonStore
}

export const store: Store = {
    missionStore: new MissionStore(),
    projectStore: new ProjectStore(),
    groupStore: new GroupStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}