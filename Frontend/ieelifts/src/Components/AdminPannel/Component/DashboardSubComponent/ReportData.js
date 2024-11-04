import React, { useState } from "react";

import ReportIssue from "./ReportIssue";
import ReportCrouserData from "./ReportCrouserData";

function ReportTable({ handleRedportData, RedportData, ticket }) {

  console.log("handleRedportData", handleRedportData);

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [showReport, setShowReport] = useState(true);
  console.log("RedportData", RedportData)
  return (
    <>
      <div className="ReportTable">
        {RedportData !== undefined && ((handleRedportData) ? (
          <ReportIssue RedportData={RedportData} />
        ) : (
          <ReportCrouserData serviceId={RedportData} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

export default ReportTable;

