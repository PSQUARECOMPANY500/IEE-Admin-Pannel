import React from "react";

const elevatorOpeningSelection = ({ Flevel, degree, array, handleClick }) => {
  return (
    <>  
      <div className="level-main-container">
        <div className="level-heading">
          <div className="level-opening">
            <span className="levelHeading">Level</span>
            <span className="heading-badge">Original opening</span>
          </div>

          {Object.entries(degree).map(
            ([key, value], index, array) =>
              value !== "" && (
                <span className="heading-badge-dynamic" key={index}>
                  {value === "90dL"
                    ? "90° Left"
                    : value === "90dR"
                    ? "90° Right"
                    : "180°"}
                </span>
              )
          )}
        </div>
        <div className="level-box-container">
          <div>
            {Flevel &&
              Flevel.map((key, index) => {
                return (
                  <div className="level-title-wrapper" key={index}>
                    <div className="level-title">{key}:</div>
                  </div>
                );
              })}
          </div>

          <div>
            {array.map((row, rowIndex) => {
              const rI = rowIndex;
              return (
                <div className="level-selector-parent" key={rowIndex}>
                  {row.map((col, colIndex) => {
                    const cI = colIndex;
                    return (
                      <span
                        className={`level-selector ${
                          array[rI][cI] ? "level-selector-active" : ""
                        }`}
                        onClick={() => handleClick(rI, cI)}
                        key={colIndex}
                      ></span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default elevatorOpeningSelection;
