import React, { useState, useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";

const ClientMembershipHistory = () => {
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
    <div>
      <div>
        <p>History</p>
      </div>

      <div
        ref={historyRef}
        className="history"
        onClick={toggleHistory}
        style={{ cursor: "pointer" }}
      >
        {showHistory && (
          <div className="historyDetails">
            <div className="historyClings">
              <span>Discount 5%</span>
              <span>Amount paid: 42000</span>
            </div>
            <div className="historyClings">
              <span>Callbacks: 2 </span>
              <span>Services: 7</span>
            </div>
            <div className="historyClings">
              <span>Spare Parts sold: 5 </span>
              <span>Revenue: 21000</span>
            </div>
            <div className="historyClings">
              <span>SOS calls: 3 </span>
              <p className="rating">
                <span>Rating: 4.2</span>
                <span>
                  <FaStar className="ratingStar" />
                </span>
              </p>
            </div>
          </div>
        )}
        <div className="historyNumber">
          <p>June 12, 2016</p>
          <p>
            <FaPrint />
          </p>
          <p>June 12, 2017</p>
        </div>
      </div>
    </div>
  );
};

export default ClientMembershipHistory;
