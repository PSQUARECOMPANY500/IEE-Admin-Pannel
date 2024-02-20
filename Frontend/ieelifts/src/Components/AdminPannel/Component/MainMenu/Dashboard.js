// Dashboard.js
import React, { useEffect, useRef, useState } from "react";
import ServiceEnggCrousel from "../DashboardSubComponent/ServiceEnggCrousel";
import TaskLocationSection from "../DashboardSubComponent/TaskLocationSection";
import TicketSection from "../DashboardSubComponent/TicketSection";

const Dashboard = () => { 
  const [kanban, setKanban] = useState(true);
  const [ticketUpdate, setTicketUpdate] = useState(true);
  const [shouldScrollToTop, setShouldScrollToTop] = useState(true);
  const ref = useRef(null);
  const ref2 = useRef(null);

  useEffect(() => {
    if (ref.current && shouldScrollToTop) {
      ref2.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (ref.current && !shouldScrollToTop) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [kanban, shouldScrollToTop]);

  const handleKanbanToggle = () => {
    setShouldScrollToTop(prev => !prev);
    setKanban(prevKanban => !prevKanban);
  };

  return (
    <>
      <div ref={ref2}  className={`main-container`}>
        <div className={`container`}></div>
        <div style={{ width: "100%", marginTop: "6%" }}>
          <ServiceEnggCrousel ticketUpdate={ticketUpdate}/>
          <TaskLocationSection ref={ref} handleKanbanToggle={handleKanbanToggle} kanban={kanban} />
          {kanban && <TicketSection setTicketUpdate={setTicketUpdate} />}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
