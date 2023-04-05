import { createContext, useContext } from "react";
import MissionStore from "./missionStore";
import UserStore from "./userStore";
import ProjectStore from "./projectStore";
import GroupStore from "./groupStore";
import CommonStore from "./commonStore";
import ProcessStore from "./processStore";
import CommentStore from "./commentStore";

interface Store {
    missionStore: MissionStore,
    projectStore: ProjectStore,
    groupStore: GroupStore,
    processStore: ProcessStore,
    userStore: UserStore,
    commonStore: CommonStore,
    commentStore: CommentStore
}

export const store: Store = {
    missionStore: new MissionStore(),
    projectStore: new ProjectStore(),
    groupStore: new GroupStore(),
    processStore: new ProcessStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    commentStore: new CommentStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}