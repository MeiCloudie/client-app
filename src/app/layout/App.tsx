import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./App.css";
import MyNavbar from "./MyNavbar";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div>
      <MyNavbar />
      <div className="main">
        <Sidebar />
        <Container>
          <Outlet />
        </Container>
        {/* <div className="container">
        <h1 className="title">My React App</h1>
        <p className="info">
          Hello world
        </p>
        <button className="btn">Explore now</button>
      </div> */}
      </div>
    </div>
  );
}

export default App;