import React, { useState } from "react";
import ReportIssue from "./ReportIssue";
import ReportCrouserData from "./ReportCrouserData";

function ReportTable({handleRedportData ,RedportData}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReport,setShowReport]=useState(true)
  


  const serviceId = RedportData


  return (
    <div className="ReportTable">

     {handleRedportData?( <ReportIssue RedportData={RedportData}/>):(
      <ReportCrouserData/>
      )}
    </div>
  );
}

export default ReportTable;
