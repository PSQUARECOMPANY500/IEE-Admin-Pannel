import React, { useState } from "react";

const MembershipCardDetails = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div>
        <div onClick={() => handleClick("Revenue")}>Show Revenue</div>
        <div onClick={() => handleClick("Expired")}>Show Expired</div>
        <div onClick={() => handleClick("ExpiringSoon")}>Show Expiring Soon</div>
      </div>

      {selectedOption && (
        <div>
          <h2>{selectedOption}</h2>
          {/* Display information based on the selected option */}
          {selectedOption === "Revenue" && (
            <p>Show revenue information here...</p>
          )}
          {selectedOption === "Expired" && (
            <p>Show expired information here...</p>
          )}
          {selectedOption === "ExpiringSoon" && (
            <p>Show expiring soon information here...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MembershipCardDetails;
