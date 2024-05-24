// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React, { useState, useEffect, useMemo } from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import TextInput from "./ClientsReusableComponent/TextInput";
const ClientFormDimentions = ({
  valforDimention,
  Flevel,
  validate,
  forSecondClick,
}) => {
  //states
  const [len, setLen] = useState();
  const [Basementlen, setBasementLen] = useState();
  const [visible, setVisible] = useState(false);
  const [basementLevel, setBasemnetLevel] = useState([]);
  const [levelData, setLevelData] = useState([]);
  const [click, setClick] = useState({});
  const [check, setCheck] = useState(validate);
  const [basementWithPit, setBasementWithPit] = useState({
    shaftWidth: "",
    shaftDepth: "",
    doorWidth: "",
    doorHeight: "",
    floorToFloorHeight: "",
    pitDepth: "",
    fl: "",
    fr: "",
  });
  console.log("basementWithPit",basementWithPit)
  const [floorFrontData, setFloorFrontData] = useState({
    shaftWidth: "",
    shaftDepth: "",
    doorWidth: "",
    doorHeight: "",
    overhead: "",
  });
  useEffect(() => {
    const initialFormData = Flevel.slice(1, -1).map(() => ({
      shaftWidth: "",
      shaftDepth: "",
      doorWidth: "",
      doorHeight: "",
      floorToFloorHeight: "",
      fl: "",
      fr: "",
    }));
    setLevelData(initialFormData);
  }, [Flevel]);

  //handler

  const handleInputChangeInPit = (e) => {
    const { name, value } = e.target;
    setBasementWithPit((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleInputChangeInPFloorFront = (e) => {
    const { name, value } = e.target;
    setFloorFrontData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newFormData = [...levelData];
    newFormData[index] = {
      ...newFormData[index],
      [name]: value,
    };
    setLevelData(newFormData);
  };
  const handleClick = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: true });
  };

  const handleClickFalse = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: false });
  };

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  const handleOnClick = () => {
    toggleVisibility();
    forSecondClick();
  };

  return (
    <div className="client-form-dimensions">
      <h5 className="client-form-details-heading">Dimensions</h5>
      <hr className="client-form-hr" />
      <div
        className={`dimention-btn ${visible ? "hide" : ""} ${
          !check ? "disabled" : ""
        }`}
        onClick={handleOnClick}
      >
        Generate dimensions{" "}
        <img src="generateicon.png" alt="icon" className="generateIcon" />
      </div>
      {visible && (
        <div className="dimenstions-container">
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
                />
              </div>
            </div>
            <div className="site-photos">Site Photos</div>
            <div className="dimension-btn-wrapper">
              <label className="dimension-btn">
                Pit
                <input className="hidden-input" type="file" />
              </label>
              <div className="dimension-upload-btn">
                <label className="dimension-upload-btn">
                  Bottom to Top{" "}
                  <img src="./uploadIcon.png " className="upload-icon" />
                  <input className="hidden-input" type="file" />
                </label>
              </div>
              <div className="dimension-upload-btn">
                <label className="dimension-upload-btn">
                  Basement Front{" "}
                  <img src="./uploadIcon.png " className="upload-icon" />
                  <input className="hidden-input" type="file" />
                </label>
              </div>
            </div>
          </div>

          {Flevel &&
            Flevel.slice(1, -1).map((val, index) => {
              return (
                <div className="floor-section" key={index}>
                  <div className="floor">
                    <div className="floor-heading floor-margin">{val}</div>
                    <div>
                      <div className="floor-input-wrapper">
                        <div>
                          <TextInput
                            label={"Shaft Width"}
                            name={"shaftWidth"}
                            onFocus={handleClick}
                            value={levelData[index]?.shaftWidth || ""}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
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
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
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
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
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
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
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
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
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
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            click={click.fl}
                            onBlur={handleClickFalse}
                          />
                          <TextInput
                            label={"FR"}
                            name={"fr"}
                            onFocus={handleClick}
                            value={levelData[index]?.fr || ""}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            click={click.fr}
                            onBlur={handleClickFalse}
                          />
                        </div>
                      </div>
                      <div className="site-photos">Site Photos</div>
                      <div className="dimension-btn-wrapper">
                        <label className="dimension-btn">
                          Floor Front
                          <input className="hidden-input" type="file" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {/* basement wrapper */}

          {/* floor start SOLVED*/}

          {/* floor top SOLVED*/}

          <div className="floor-section">
            <div className="floor">
              <div className="floor-heading floor-margin"> Floor Front </div>
              <div>
                <div className="floor-input-wrapper">
                  <div>
                    <TextInput
                      label={"Shaft Width"}
                      name={"shaftWidth"}
                      onFocus={handleClick}
                      value={floorFrontData.shaftWidth}
                      onChange={handleInputChangeInPFloorFront}
                      click={click.shaftWidth}
                      onBlur={handleClickFalse}
                    />
                  </div>
                  <div>
                    <TextInput
                      label={"Shaft Depth"}
                      name={"shaftDepth"}
                      onFocus={handleClick}
                      value={floorFrontData.shaftDepth}
                      onChange={handleInputChangeInPFloorFront}
                      click={click.shaftDepth}
                      onBlur={handleClickFalse}
                    />
                  </div>
                  <div>
                    <TextInput
                      label={"Door Width"}
                      name={"doorWidth"}
                      onFocus={handleClick}
                      value={floorFrontData.doorWidth}
                      onChange={handleInputChangeInPFloorFront}
                      click={click.doorWidth}
                      onBlur={handleClickFalse}
                    />
                  </div>
                  <div>
                    <TextInput
                      label={"Door Height"}
                      name={"doorHeight"}
                      onFocus={handleClick}
                      value={floorFrontData.doorHeight}
                      onChange={handleInputChangeInPFloorFront}
                      click={click.doorHeight}
                      onBlur={handleClickFalse}
                    />
                  </div>
                </div>
                <div className="overhead-input">
                  {/* <AnimatedInput label={"Overhead (opt)"} name={"Overhead"} /> */}
                  <TextInput
                    label={"Overhead (opt)"}
                    name={"overhead"}
                    onFocus={handleClick}
                    value={floorFrontData.overhead}
                    onChange={handleInputChangeInPFloorFront}
                    click={click.overhead}
                    onBlur={handleClickFalse}
                  />
                </div>
                <div className="site-photos">Site Photos</div>
                <div className="dimension-btn-wrapper">
                  <label className="dimension-btn">
                    Floor Front
                    <input className="hidden-input" type="file" />
                  </label>
                  <div className="dimension-upload-btn">
                    <span>
                      Top to Bottom{" "}
                      <img src="./uploadIcon.png " className="upload-icon" />
                    </span>
                  </div>
                  <div className="dimension-upload-btn">
                    <span>
                      {" "}
                      Overhead{" "}
                      <img src="./uploadIcon.png" className="upload-icon" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientFormDimentions;
