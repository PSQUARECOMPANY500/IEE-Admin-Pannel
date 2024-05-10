import React from "react";
import InformationTable from "../../../CommonComponenets/InformationTable";

const Sosrequest = () => {
  const fieldsToShow = [
    "SrNo",
    "CustomerName",
    "Status",
    "Address",
    "OrderDate",
    "MEMBERSHIP",
    "Problem",
    "DOH",
  ];

  return (
    <div className="main-container_sos">
      <div className="sosrequest_table_view">
        <div className="sosrequest_table_view_inside">
          <InformationTable fieldsToShow={fieldsToShow} />
        </div>
      </div>
    </div>
  );
};

export default Sosrequest;
