import React, { useState, useRef, useEffect } from "react";

const ClientCallDetails = () => {
  const [showHistory, setShowHistory] = useState(false);
  const historyRef = useRef(null);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleClickOutside = (event) => {
    if (historyRef.current && !historyRef.current.contains(event.target)) {
      setShowHistory(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={historyRef}
      className="clientDetailCalls"
      onClick={toggleHistory}
      style={{ cursor: "pointer" }}
    >
      {showHistory && (
        <div className="clientCallInfo">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            viverra dui eget elit venenatis sagittis. Suspendisse vel
            scelerisque enim. Mauris condimentum semper sem, et varius orci
            rhoncus a.
          </p>
        </div>
      )}
      <div className="clientNumber">
        <p>Call 1</p>
        <p>June 12</p>
        <p>20% Off</p>
      </div>
    </div>
  );
};

export default ClientCallDetails;
