import { useLocation } from "react-router-dom";
import "./App.css";
import { Playground } from "./Playground";
import MyBreadcrumb from "./MyBreadcrumb";
import HomePage from "../../features/home/HomePage";

function App() {
  const location = useLocation();

  return (
    <div>
      <MyBreadcrumb />
      {location.pathname === '/' ? <HomePage /> : <Playground />}
    </div>
  );
}

export default App;
