import React, { useState } from "react";

import ReportIssue from "./ReportIssue";
import ReportCrouserData from "./ReportCrouserData";

function ReportTable({ handleRedportData, RedportData, ticket }) {

  // console.log("handleRedportData", handleRedportData);

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [showReport, setShowReport] = useState(true);

  return (
    <>
      <div className="ReportTable">
        {handleRedportData ? (
          <ReportIssue RedportData={RedportData} />
        ) : (
          <ReportCrouserData serviceId={RedportData} ticket={ticket} />
        )}
      </div>
    </>
  );
}

export default ReportTable;

