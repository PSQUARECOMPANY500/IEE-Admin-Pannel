import React, { useState, useRef, useEffect } from "react";
import { offerDiscountByServiceId } from "../../../../ReduxSetup/Actions/AdminActions";
import toast from "react-hot-toast";


const OfferButton = ({ isExpired, dataType, clientDetail }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [discount, setDiscount] = useState();
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
  const historyRef = useRef(null);

  const handleClickOutside = (event) => {
    if (historyRef.current && !historyRef.current.contains(event.target)) {
      setShowHistory(false);
    }
  };

  // console.log("discount",discount)

  const handleButtonClick = (text, index) => {
    setDiscount(text);
    setClickedButtonIndex(index);
    setShowHistory(true);
  };
  const handleOfferDiscount = async () => {
    if(!discount){
      toast.error("Please select discount");
      return;
    }
    await offerDiscountByServiceId(clientDetail?.responseData?.jobOrderNumber,discount,18);
    setDiscount("");
  };

  const handleMouseEnter = () => {
    setShowHistory(true);
  };

  const handleMouseLeave = () => {
    if (clickedButtonIndex === null) {
      setShowHistory(false);
    }
  };

  // console.log("clientDetail", clientDetail?.responseData?.jobOrderNumber);

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
    <div className="offerButtonContainer" ref={historyRef}>
      <div>
        <div
          className={`offerButtons ${
            showHistory ? "offerButtons-show" : "offerButtons-hide"
          }`}
        >
          {["15", "25", "35", "40"].map((text, index) => (
            <button
              id="offerButtonWarppers"
              key={index}
              className={`offerButton offer ${buttonClass} ${
                isExpired && "offerButtonExpired"
              }`}
              style={
                clickedButtonIndex === index
                  ? { backgroundColor: "#c10000", color: "white" }
                  : {}
              }
              onClick={() => handleButtonClick(text, index)}
            >
              {text}%
            </button>
          ))}
        </div>
        <div>
          <button
            id="offerDiscountBtn"
            className={`offerButton offerButtonMain ${buttonClass} ${
              isExpired && "offerMainExpired offerButtonMainExpired"
            } ${
              showHistory &&
              `${
                isExpired
                  ? "offerButtonMainSelectedExpired"
                  : `offerButtonMainSelected ${selectedButtonClass}`
              }`
            }`}
            style={
              clickedButtonIndex !== null
                ? { backgroundColor: "#c10000", color: "white" }
                : {}
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleOfferDiscount()}
          >
            Offer Discount
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferButton;
