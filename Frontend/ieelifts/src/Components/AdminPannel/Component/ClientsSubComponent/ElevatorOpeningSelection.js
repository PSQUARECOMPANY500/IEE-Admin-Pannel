import React from "react";

const elevatorOpeningSelection = ({ Flevel, degree, array, handleClick }) => {
  return (
    <>
      <div className="level-main-container">
        <div className="level-heading">
          <span className="levelHeading">Level</span>
          <span className="heading-badge-original">Original opening</span>
          <span className="heading-badge180">180</span>

          {Object.entries(degree).map(
            ([key, value], index, array) =>
              value !== "" && (
                <span className="heading-badge" key={index}>
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
              return (
                <div className="level-selector-parent" key={rowIndex}>
                  {/* Render the heading for each row */}
                  <span className="level-heading">
                    {rowIndex === 0 ? "B/W" : `Level${rowIndex}`}
                  </span>
                  {row.map((col, colIndex) => {
                    return (
                      <span
                        className={`level-selector ${
                          array[rowIndex][colIndex]
                            ? "level-selector-active"
                            : ""
                        }`}
                        onClick={() => handleClick(rowIndex, colIndex)}
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
