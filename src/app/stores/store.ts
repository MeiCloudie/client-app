import { createContext, useContext } from "react";
import MissionStore from "./missionStore";
import UserStore from "./userStore";
import ProjectStore from "./projectStore";

interface Store {
    missionStore: MissionStore,
    projectStore: ProjectStore,
    userStore: UserStore
}

export const store: Store = {
    missionStore: new MissionStore(),
    projectStore: new ProjectStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}