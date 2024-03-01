import React, { useState } from "react";

const MembershipCardDetails = () => {
  const [selectedOption, setSelectedOption] = useState("Expired");

  const handleClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div onClick={() => handleClick("Revenue")}>Show Revenue</div>
        <div onClick={() => handleClick("ExpiringSoon")}>
          Show Expiring Soon
        </div>
        <div onClick={() => handleClick("Expired")}>Show Expired</div>
      </div>

      {selectedOption && (
        <div>
          <h2>{selectedOption}</h2>
          {/* Display information based on the selected option */}
          {selectedOption === "Revenue" && (
            <p>Show revenue information here...</p>
          )}
          {selectedOption === "ExpiringSoon" && (
            <p>Show expiring soon information here...</p>
          )}
          {selectedOption === "Expired" && (
            <p>Show expired information here...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MembershipCardDetails;
