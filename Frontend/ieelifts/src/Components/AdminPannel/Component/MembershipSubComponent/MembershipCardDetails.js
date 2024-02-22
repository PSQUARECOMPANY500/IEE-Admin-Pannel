import React, { useState } from "react";
import ExpiringComponent from "./ExpiringComponent";

const MembershipCardDetails = ({ expiringCount, expiredCount,DemoData }) => {
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
          {/* Display information based on the selected option */}
          {selectedOption === "Revenue" && (
            <p>Show revenue information here...</p>
          )}
          {selectedOption === "Expiring" && <ExpiringComponent DemoData={DemoData} count={expiringCount} />}
          {selectedOption === "Expired" && (
            <p>Show expired information here...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MembershipCardDetails;
