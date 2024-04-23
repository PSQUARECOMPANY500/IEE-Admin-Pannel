import React, { useState } from "react";
import ReportIssue from "./ReportIssue";
import ReportCrouserData from "./ReportCrouserData";
import RepotImage from "./RepotImage";

function ReportTable({ handleRedportData, RedportData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReport, setShowReport] = useState(true)


  return (

    <>

      <div className="ReportTable">

        {handleRedportData ? (

 
          <ReportCrouserData />
          
        ) : (
          <ReportCrouserData />)}
      </div>


    </>


  );
}

export default ReportTable;
