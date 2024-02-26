
import React, { useState, useRef, useEffect } from "react";
import { FaStar, FaPrint } from "react-icons/fa";

const ClientMembershipHistory = () => {
  const [showHistory, setShowHistory] = useState(Array(10).fill(false)); // Array of showHistory states with 10 initial elements
  const historyRefs = useRef(Array(10).fill(null)); // Array of refs for each detail section

  const toggleHistory = (index) => {
    setShowHistory(prevState =>
      prevState.map((value, i) => (i === index ? !value : value))
    );
  };

  const handleClickOutside = (event, index) => {
    if (historyRefs.current[index] && !historyRefs.current[index].contains(event.target)) {
      setShowHistory(prevState =>
        prevState.map((value, i) => (i === index ? false : value))
      );
    }
  };

  useEffect(() => {
    const eventListeners = historyRefs.current.map((ref, index) => {
      return (event) => handleClickOutside(event, index);
    });
    eventListeners.forEach(listener => {
      document.addEventListener("click", listener);
    });
    return () => {
      eventListeners.forEach(listener => {
        document.removeEventListener("click", listener);
      });
    };
  }, []);

  return (
    <div>
      <div >
        <p>History</p>
      </div>
      <div className="historyContainer">
        {showHistory.map((isShown, index) => (
          <div key={index} >
            <div
              ref={el => historyRefs.current[index] = el}
              className="history"
              onClick={() => toggleHistory(index)}
              style={{ cursor: "pointer", marginBottom: "10px" }}
            >
              {isShown && (
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
        ))}
      </div>
    </div>
  );
};

export default ClientMembershipHistory;
