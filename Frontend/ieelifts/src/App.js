import "./App.css";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./Components/CommonComponenets/Sidebar/Sidebar";
import Dashboard from "./Components/AdminPannel/Component/MainMenu/Dashboard";
import Request from "./Components/AdminPannel/Component/MainMenu/Request";
import Membership from "./Components/AdminPannel/Component/MainMenu/Membership";
import Clients from "./Components/AdminPannel/Component/MainMenu/Clients";

function App() {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Requests" element={<Request />} />
          <Route path="/Memberships" element={<Membership />} />
          <Route path="/Clients" element={<Clients />} />
        </Routes>
      </Sidebar>
    </>
  );
}

export default App;
