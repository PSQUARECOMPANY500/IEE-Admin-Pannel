import React, { useState } from "react";
import AllottedSpareParts from "./AllottedSpareParts";
import SparePartRequests from "./SparePartRequests";
import Revenue from "./Revenue";

const SpareParts = (props) => {
  const { engID } = props;

  const [currentComponent, setCurrentComponent] = useState(null)
  const [leftSide, setLeftSide] = useState(0)
  const renderSelectedComponent = () => {
    switch (currentComponent) {
      case "c1":
        return < AllottedSpareParts engID={engID} />;
      case "c2":
        return <SparePartRequests engID={engID} />;
      case "c3":
        return <Revenue engID={engID} />;
      default:
        return <Revenue engID={engID} />;
    }
  };

  const currentComponentHandler = (c,le) => {
    setCurrentComponent(c)
    setLeftSide(le)
  }

  return <div className="spare-part">
    <div className="sub-spare-part">
      <div className="spare-part-head">
        <h5 onClick={() => currentComponentHandler('c1',3)}>Allotted Spare Parts</h5>
        <h5 onClick={() => currentComponentHandler('c2',44)}>Spare Part Requests</h5>
        <h5 onClick={() => currentComponentHandler('c3',77)}>Revenue</h5>
      </div>

      <div className="vertical-line" style={{width:'90%',left:'5%',}}>

      <div className="spare-part-progress"   style={{ marginLeft: leftSide + "%" }}></div>
      </div>
      <div className="spare-part-content">
        {renderSelectedComponent()}
      </div>
    </div>
  </div>;
};

export default SpareParts;