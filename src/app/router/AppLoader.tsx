import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import LoadingComponent from "../layout/LoadingComponent";
import { Outlet } from "react-router-dom";

const AppLoader = observer(() => {
    const { commonStore, userStore } = useStore();

    React.useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore]);

    if (!commonStore.appLoaded) return <LoadingComponent />;

    return <Outlet />;
});

export default AppLoader;
