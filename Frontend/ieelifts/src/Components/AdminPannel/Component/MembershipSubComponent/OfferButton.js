// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useState, useRef, useEffect } from "react";

const OfferButton = ({ isExpired, dataType }) => {
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

  const buttonClass =
    dataType === "Gold"
      ? "offerButtonMainGold"
      : dataType === "Platinum"
      ? "offerButtonMainPlatinum"
      : dataType === "Silver"
      ? "offerButtonMainSilver"
      : "";

  const selectedButtonClass =
    dataType === "Gold"
      ? " offerButtonMainSelectedGold"
      : dataType === "Platinum"
      ? "offerButtonMainSelectedPlatinum"
      : dataType === "Silver"
      ? "offerButtonMainSelectedSilver"
      : "";

  return (
    <div style={{ marginTop: 10 }}>
      <div className="offerButtonContainer">
        {showHistory && (
          <div className="offerButtons">
            <button
              className={`offerButton offer ${buttonClass} ${
                isExpired && "offerButtonExpired"
              }`}
            >
              15%
            </button>
            <button
              className={`offerButton offer ${buttonClass} ${
                isExpired && "offerButtonExpired"
              }`}
            >
              25%
            </button>
            <button
              className={`offerButton offer ${buttonClass} ${
                isExpired && "offerButtonExpired"
              }`}
            >
              35%
            </button>
            <button
              className={`offerButton offer ${buttonClass} ${
                isExpired && "offerButtonExpired"
              }`}
            >
              other
            </button>
          </div>
        )}
        <div onClick={toggleHistory} ref={historyRef}>
          <button
            className={`offerButton offerButtonMain ${buttonClass}  offerButtonMainGold${
              isExpired && "offerMainExpired offerButtonMainExpired"
            } ${
              showHistory &&
              `${
                isExpired
                  ? "offerButtonMainSelectedExpired"
                  : `offerButtonMainSelected ${selectedButtonClass} `
              }`
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
