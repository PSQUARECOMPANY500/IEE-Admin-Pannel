import React, { useState } from "react";
import ServiceEnggCrousel from "../DashboardSubComponent/ServiceEnggCrousel";
import TaskLocationSection from "../DashboardSubComponent/TaskLocationSection";
import TicketSection from "../DashboardSubComponent/TicketSection";


const Dashboard = () => {
  const [kanban,setKanban] = useState(true);
  return (
    <>
      <div className={`main-container ${!kanban && "main-container-animation"}`}>
        <div className="container"></div>
        <div style={{ width: "100%", marginTop: "6%" }}>
          <ServiceEnggCrousel />
          <TaskLocationSection kanban={kanban} setKanban={setKanban} />
          {kanban ? <TicketSection /> : null}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
