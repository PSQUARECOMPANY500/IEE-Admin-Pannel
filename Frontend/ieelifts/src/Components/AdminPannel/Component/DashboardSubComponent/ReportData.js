import React, { useState } from "react";
import ReportIssue from "./ReportIssue";
import ReportCrouserData from "./ReportCrouserData";
import RepotImage from "./RepotImage";

function ReportTable({ handleRedportData, RedportData }) {
  // console.log("preet", RedportData);
  // console.log("handleRedportData", handleRedportData);

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [showReport, setShowReport] = useState(true);

  return (
    <>
      <div className="ReportTable">
        {handleRedportData ? (
          <ReportIssue RedportData={RedportData} />
        ) : (
          <ReportCrouserData />
        )}
      </div>
    </>
  );
}

export default ReportTable;
