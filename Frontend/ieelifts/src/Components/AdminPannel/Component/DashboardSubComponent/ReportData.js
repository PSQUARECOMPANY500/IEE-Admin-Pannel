import React, { useState } from "react";
import ReportIssue from "./ReportIssue";
import ReportCrouserData from "./ReportCrouserData";

function ReportTable({handleRedportData}) {



  return (
    <div className="ReportTable">

     {handleRedportData?( <ReportCrouserData/>):(
      <ReportCrouserData/>
        )}
    </div>
  );
}

export default ReportTable;
