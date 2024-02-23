import React, { useState, useRef, useEffect } from "react";

const OfferButton = () => {
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
    <div style={{ marginTop: 10 }}>
      <div className="offerButtonContainer">
        {showHistory && (
          <div className="offerButtons">
            <button className="offerButton offer">15%</button>
            <button className="offerButton offer">25%</button>
            <button className="offerButton offer">35%</button>
            <button className="offerButton offer">other</button>
          </div>
        )}
        <div onClick={toggleHistory} ref={historyRef}>
          <button
            className={`offerButton offerButtonMain ${
              showHistory && "offerButtonMainSelected"
            }`}
          >
            Offer Discount
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferButton;
