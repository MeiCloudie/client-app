import { useLocation } from "react-router-dom";
import "./App.css";
import { Playground } from "./Playground";
import MyBreadcrumb from "./MyBreadcrumb";
import HomePage from "../../features/home/HomePage";
import { useStore } from "../stores/store";
import React from "react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "./LoadingComponent";


function App() {
  const location = useLocation()
  const { commonStore, userStore } = useStore()

  React.useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])
  if (!commonStore.appLoaded) return <LoadingComponent />
  return (
    <div>
      <MyBreadcrumb />
      {location.pathname === '/' ? <HomePage /> : <Playground />}

    </div>
  );
}

export default observer(App);
