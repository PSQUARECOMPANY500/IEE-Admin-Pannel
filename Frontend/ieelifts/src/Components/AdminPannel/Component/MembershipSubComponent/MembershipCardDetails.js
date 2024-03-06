import React, { useState } from "react";
import ExpiringComponent from "./ExpiringComponent";
import ExpiredComponent from "./ExpiredComponent";

const MembershipCardDetails = ({ expiringCount, expiredCount, DemoData }) => {
  const [selectedOption, setSelectedOption] = useState("Expiring");

  const handleClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="expandedMembershipheading">
        <div
          onClick={() => handleClick("Revenue")}
          className="headingCenter"
          style={{
            borderBottom: selectedOption === "Revenue" && "2px solid #0F351D",
          }}
        >
          Revenue
        </div>
        <div
          onClick={() => handleClick("Expiring")}
          className="headingCenter"
          style={{
            borderBottom: selectedOption === "Expiring" && "2px solid #0F351D",
          }}
        >
          <span>Expiring Soon</span> <span>{expiringCount}</span>
        </div>
        <div
          onClick={() => handleClick("Expired")}
          style={{
            borderBottom: selectedOption === "Expired" && "2px solid #0F351D",
          }}
          className="headingCenter"
        >
          <span>Expired</span> <span>{expiredCount}</span>
        </div>
      </div>

      {selectedOption && (
        <div>
          {selectedOption === "Revenue" && (
            <p>Show revenue information here...</p>
          )}
          {selectedOption === "Expiring" && (
            <ExpiringComponent DemoData={DemoData} />
          )}
          {selectedOption === "Expired" && (
            <ExpiredComponent DemoData={DemoData} />
          )}
        </div>
      )}
    </div>
  );
};

export default MembershipCardDetails;
