//import { Container } from "@mui/material";
//import { Outlet } from "react-router-dom";
import "./App.css";
import BasicBreadcrumbs from "./BasicBreadcrumbs";
//import MyNavbar from "./MyNavbar";
import { Playground } from "./Playground";
//import Sidebar from "./Sidebar";

function App() {
  return (
    <div>
      <BasicBreadcrumbs />
      <Playground />
    </div>
    // <div>
    //   <MyNavbar />
    //   <div className="main">
    //     <Sidebar />
    //     <Container>
    //       <Outlet />
    //     </Container>
    //     {/* <div className="container">
    //     <h1 className="title">My React App</h1>
    //     <p className="info">
    //       Hello world
    //     </p>
    //     <button className="btn">Explore now</button>
    //   </div> */}
    //   </div>
    // </div>
  );
}

export default App;
