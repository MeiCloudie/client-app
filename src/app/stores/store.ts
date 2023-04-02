import { createContext, useContext } from "react";
import MissionStore from "./missionStore";
import UserStore from "./userStore";

interface Store {
    missionStore: MissionStore,
    userStore: UserStore
}

export const store: Store = {
    missionStore: new MissionStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}