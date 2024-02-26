import React, { useState, useRef, useEffect } from "react";

const ClientCallDetails = () => {
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
    <div className="callsContainer">
      {showHistory.map((isShown, index) => (
        <div key={index} >
          <div
            ref={el => historyRefs.current[index] = el}
            className="clientDetailCalls"
            onClick={() => toggleHistory(index)}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            {isShown && (
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
              <p>Call {index + 1}</p>
              <p>June 12</p>
              <p>20% Off</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientCallDetails;
