import React from "react";
import ServiceEnggCrousel from "../DashboardSubComponent/ServiceEnggCrousel";
import TaskLocationSection from "../DashboardSubComponent/TaskLocationSection";
import TicketSection from "../DashboardSubComponent/TicketSection";


const Dashboard = () => {
  return (
    <>
      <div className="main-container">
        <div className="container"></div>
        <div style={{ width: "100%", marginTop: "6%" }}>
          <ServiceEnggCrousel />
          <TaskLocationSection />
          <TicketSection />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
