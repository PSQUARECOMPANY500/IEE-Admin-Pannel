import React from "react";
import "./WalkthroughWrapper.css";
import { useSelector } from "react-redux";

const WalkthroughWrapper = ({ children, index, content, top, left }) => {
  const currentWalkthroughIndex = useSelector(
    (state) => state?.WalkthroughRootReducer?.walkthroughIndexReducer?.index
  );

  console.log("currentWalkthroughIndex", currentWalkthroughIndex);
  return (
    <>
      <div style={{ zIndex: currentWalkthroughIndex === index && "1001" }}>
        {children}
      </div>

      {currentWalkthroughIndex === index && (
        <>
          <div className="walkthrough-overlay"></div>

          <div
            className="walkthrough-tooltip"
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            <p>{content}</p>
          </div>
        </>
      )}
    </>
  );
};

export default WalkthroughWrapper;
