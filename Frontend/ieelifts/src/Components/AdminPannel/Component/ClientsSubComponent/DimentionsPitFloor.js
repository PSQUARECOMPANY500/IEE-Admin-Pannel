// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React from 'react';
import TextInput from './ClientsReusableComponent/TextInput';

const DimentionPitFloor = ({Flevel,basementWithPit, handleClick, handleInputChangeInPit, click, handleFileChangeInPit, fileNames,handleClickFalse}) => {
  return (
    <div className="basement-section">
            <div className="floor-header">
              <div className="floor-heading">{Flevel[0]}</div>
              <div className="mmBtn">mm</div>
            </div>
            <div className="basement-input-wrapper">
              <div>
                <TextInput
                  label={"Shaft Width"}
                  name={"shaftWidth"}
                  onFocus={handleClick}
                  value={basementWithPit.shaftWidth}
                  onChange={handleInputChangeInPit}
                  click={click.shaftWidth}
                  onBlur={handleClickFalse}
                  id={`shaftWidth`}
                  type={"number"}
                />
              </div>
              <div>
                <TextInput
                  label={"Shaft Depth"}
                  name={"shaftDepth"}
                  value={basementWithPit.shaftDepth}
                  onChange={handleInputChangeInPit}
                  onFocus={handleClick}
                  click={click.shaftDepth}
                  onBlur={handleClickFalse}
                  id={`shaftDepth`}
                  type={"number"}
                />
              </div>
              <div>
                <TextInput
                  label={"Door Width"}
                  name={"doorWidth"}
                  onFocus={handleClick}
                  value={basementWithPit.doorWidth}
                  onChange={handleInputChangeInPit}
                  click={click.doorWidth}
                  onBlur={handleClickFalse}
                  id={`doorWidth`}
                  type={"number"}
                />
              </div>
              <div>
                <TextInput
                  label={"Door Height"}
                  name={"doorHeight"}
                  onFocus={handleClick}
                  value={basementWithPit.doorHeight}
                  onChange={handleInputChangeInPit}
                  click={click.doorHeight}
                  onBlur={handleClickFalse}
                  id={`doorHeight`}
                  type={"number"}
                />
              </div>
              <div>
                <TextInput
                  label={"Floor to Floor Height"}
                  name={"floorToFloorHeight"}
                  onFocus={handleClick}
                  value={basementWithPit.floorToFloorHeight}
                  onChange={handleInputChangeInPit}
                  click={click.floorToFloorHeight}
                  onBlur={handleClickFalse}
                  id={`floorToFloorHeight`}
                  type={"number"}
                />
              </div>

              <div>
                <TextInput
                  label={"Pit Depth"}
                  name={"pitDepth"}
                  onFocus={handleClick}
                  value={basementWithPit.pitDepth}
                  onChange={handleInputChangeInPit}
                  click={click.pitDepth}
                  onBlur={handleClickFalse}
                  id={`pitDepth`}
                  type={"number"}
                />
              </div>

              <div>
                <TextInput
                  label={"FL"}
                  name={"fl"}
                  onFocus={handleClick}
                  value={basementWithPit.fl}
                  onChange={handleInputChangeInPit}
                  click={click.fl}
                  onBlur={handleClickFalse}
                  id={`fl`}
                  type={"number"}
                />
              </div>
              <div>
                <TextInput
                  label={"FR"}
                  name={"fr"}
                  onFocus={handleClick}
                  value={basementWithPit.fr}
                  onChange={handleInputChangeInPit}
                  click={click.fr}
                  onBlur={handleClickFalse}
                  id={`fr`}
                  type={"number"}
                />
              </div>
            </div>
            <div className="site-photos">Site Photos</div>
            <div className="dimension-btn-wrapper">
              <div>
                <label
                  className={`dimension-btn ${
                    fileNames["pit"] ? "dimension-btn-background" : ""
                  }`}
                >
                  <span>Pit</span>
                  <img src="./uploadIcon.png " className="upload-icon" alt='uploadIcon' />
                  <input
                    className="hidden-input"
                    type="file"
                    onChange={(e) => handleFileChangeInPit(e, "pit")}
                    accept=".jpeg,.jpg,.pdf"
                  />
                </label>
                {fileNames["pit"] && (
                  <div className="file-name">{fileNames["pit"]}</div>
                )}
              </div>
              <div className="dimension-btn-wrapper">
                <div>
                  <label
                    className={`dimension-btn ${
                      fileNames["bottomToTop"] ? "dimension-btn-background" : ""
                    }`}
                  >
                    <span>Bottom to top</span>
                    <img src="./uploadIcon.png " className="upload-icon" alt='uploadIcon' />
                    <input
                      className="hidden-input"
                      type="file"
                      onChange={(e) => handleFileChangeInPit(e, "bottomToTop")}
                       accept=".jpeg,.jpg,.pdf"
                    />
                  </label>

                  {fileNames["bottomToTop"] && (
                    <div className="file-name">{fileNames["bottomToTop"]}</div>
                  )}
                </div>
              </div>
              <div className="dimension-btn-wrapper">
                <div>
                  <label
                    className={`dimension-btn ${
                      fileNames["basementFront"]
                        ? "dimension-btn-background"
                        : ""
                    }`}
                  >
                    <span>Basement Front</span>
                    <img src="./uploadIcon.png " className="upload-icon" alt='uploadIcon' />
                    <input
                      className="hidden-input"
                      type="file"
                      onChange={(e) => handleFileChangeInPit(e, "basementFront")}
                       accept=".jpeg,.jpg,.pdf"
                    />
                  </label>
                  {fileNames["basementFront"] && (
                    <div className="file-name">
                      {fileNames["basementFront"]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
  );
};

export default DimentionPitFloor;