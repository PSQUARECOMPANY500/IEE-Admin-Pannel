import React, { useState } from "react";
import ReportIssue from "./ReportIssue";
import ReportCrouserData from "./ReportCrouserData";
import RepotImage from "./RepotImage";

function ReportTable({ handleRedportData, RedportData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReport, setShowReport] = useState(true)



  const serviceId = RedportData;



  return (

    <>
      <div className="ReportTable">

        {handleRedportData ? (

          <ReportCrouserData />
        ) : (
          <ReportCrouserData />)}
      </div>

      {false&& <RepotImage />}

    </>


  );
}

export default ReportTable;
