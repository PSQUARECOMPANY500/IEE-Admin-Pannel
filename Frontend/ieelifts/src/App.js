import "./App.css";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./Components/CommonComponenets/Sidebar/Sidebar";
import Dashboard from "./Components/AdminPannel/Component/MainMenu/Dashboard";
import Request from "./Components/AdminPannel/Component/MainMenu/Request";


function App() {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Requests" element={<Request />} />
        </Routes>
        </Sidebar>
     
    </>
  );
}

export default App;
