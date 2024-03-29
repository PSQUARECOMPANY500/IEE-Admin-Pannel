import React, { useState } from "react";
import AllottedSpareParts from "./AllottedSpareParts";
import SparePartRequests from "./SparePartRequests";
import Revenue from "./Revenue";

const SpareParts = () => {

  const [currentComponent, setCurrentComponent] = useState(null)
  const renderSelectedComponent = () => {
    switch (currentComponent) {
      case "c1":
        return < AllottedSpareParts />;
      case "c2":
        return <SparePartRequests />;
      case "c3":
        return <Revenue />;
      default:
        return <Revenue />;
    }
  };

  return <div className="spare-part">
    <div className="sub-spare-part">
      <div className="spare-part-head">
        <h5 onClick={() => setCurrentComponent("c1")}>Allotted Spare Parts</h5>
        <h5 onClick={() => setCurrentComponent("c2")}>Spare Part Requests</h5>
        <h5 onClick={() => setCurrentComponent("c3")}>Revenue</h5>
      </div>
      <div className="spare-part-content">
        {renderSelectedComponent()}
      </div>
    </div>
  </div>;
};

export default SpareParts;