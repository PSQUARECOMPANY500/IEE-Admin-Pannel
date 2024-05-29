import React from "react";
import TextInput from "./ClientsReusableComponent/TextInput";

export const DimentionMidFloor = ({
  Flevel,
  handleClick,
  click,
  fileNames,
  handleClickFalse,
  handleFileChangeInLevel,
  levelData,
  handleInputChange,
  LevelName,
  index,
}) => {


  console.log("index====>",index)
  return (
    
    <div className="floor-section">
      <div className="floor">
        <div className="floor-heading floor-margin">{LevelName}</div>
        <div>
          <div className="floor-input-wrapper">
            <div>
              <TextInput
                label={"Shaft Width"}
                name={"shaftWidth"}
                onFocus={handleClick}
                value={levelData[index]?.shaftWidth || ""}
                onChange={(event) => handleInputChange(event, index)}
                click={click.shaftWidth}
                onBlur={handleClickFalse}
                
              />
            </div>
            <div>
              <TextInput
                label={"Shaft Depth"}
                name={"shaftDepth"}
                onFocus={handleClick}
                value={levelData[index]?.shaftDepth || ""}
                onChange={(event) => handleInputChange(event, index)}
                click={click.shaftDepth}
                onBlur={handleClickFalse}
              />
            </div>
            <div>
              <TextInput
                label={"Door Width"}
                name={"doorWidth"}
                onFocus={handleClick}
                value={levelData[index]?.doorWidth || ""}
                onChange={(event) => handleInputChange(event, index)}
                click={click.doorWidth}
                onBlur={handleClickFalse}
              />
            </div>
            <div>
              <TextInput
                label={"Door Height"}
                name={"doorHeight"}
                onFocus={handleClick}
                value={levelData[index]?.doorHeight || ""}
                onChange={(event) => handleInputChange(event, index)}
                click={click.doorHeight}
                onBlur={handleClickFalse}
              />
            </div>
            <div>
              <TextInput
                label={"Floor to Floor Height"}
                name={"floorToFloorHeight"}
                onFocus={handleClick}
                value={levelData[index]?.floorToFloorHeight || ""}
                onChange={(event) => handleInputChange(event, index)}
                click={click.floorToFloorHeight}
                onBlur={handleClickFalse}
              />
            </div>
            <div className="floor-fl-fr-container">
              <TextInput
                label={"FL"}
                name={"fl"}
                onFocus={handleClick}
                value={levelData[index]?.fl || ""}
                onChange={(event) => handleInputChange(event, index)}
                click={click.fl}
                onBlur={handleClickFalse}
              />
              <TextInput
                label={"FR"}
                name={"fr"}
                onFocus={handleClick}
                value={levelData[index]?.fr || ""}
                onChange={(event) => handleInputChange(event, index)}
                click={click.fr}
                onBlur={handleClickFalse}
              />
            </div>
          </div>
          <div className="site-photos">Site Photos</div>
          <div className="dimension-btn-wrapper">
            <div>
              <label
                className={`dimension-btn ${
                  fileNames[index] ? "dimension-btn-background" : ""
                }`}
              >
                <span>Floor Front</span>
                <img src="./uploadIcon.png" className="upload-icon" />
                <input
                  className="hidden-input"
                  type="file"
                  onChange={(e) => handleFileChangeInLevel(e)}
                />
              </label>
              {fileNames[index] && (
                <div className="file-name">{fileNames[index]}</div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
