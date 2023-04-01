import { createContext, useContext } from "react";
import MissionStore from "./missionStore";

interface Store {
    missionStore: MissionStore
}

export const store: Store = {
    missionStore: new MissionStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}