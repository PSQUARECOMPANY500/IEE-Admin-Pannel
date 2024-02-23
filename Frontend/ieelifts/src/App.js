import "./App.css";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./Components/CommonComponenets/Sidebar/Sidebar";
import Dashboard from "./Components/AdminPannel/Component/MainMenu/Dashboard";
import Request from "./Components/AdminPannel/Component/MainMenu/Request";
import Membership from "./Components/AdminPannel/Component/MainMenu/Membership";
import Enggeniers from "./Components/AdminPannel/Component/MainMenu/Enggeniers";


function App() {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Requests" element={<Request />} />
          <Route path="/Memberships" element={<Membership />} />
          <Route path="/Engeeniers" element={<Enggeniers/>} />
        </Routes>
      </Sidebar>
    </>
  );
}

export default App;
