// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React, { useState, useEffect, useMemo } from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import TextInput from "./ClientsReusableComponent/TextInput";
const ClientFormDimentions = ({
  valforDimention,
  Flevel,
  validate,
  forSecondClick,
  onDataChange
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
    fr: ""
  });
  // console.log("basementWithPit", basementWithPit);
  const [floorFrontData, setFloorFrontData] = useState({
    shaftWidth: "",
    shaftDepth: "",
    doorWidth: "",
    doorHeight: "",
    overhead: "",
  });


  const [fileNames, setFileNames] = useState({});
  // console.log("filenames",fileNames)

  // const handleFileChange = (event, label) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setFileNames({
  //       ...fileNames,
  //       [label]: file.name,
  //     });
  //   }
  // };
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
   const [dimentionsData,setDimentionsData] =useState({
    basementWithPit:basementWithPit,
    floorFrontData:floorFrontData,
    levelData:levelData
   })

   useEffect(() => {
    setDimentionsData({
      basementWithPit: basementWithPit,
      floorFrontData: floorFrontData,
      levelData: levelData
    });
  }, [basementWithPit, floorFrontData, levelData]);
   console.log("dimentionsData",dimentionsData);
  //handler

  const handleFileChangeInPit = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      setBasementWithPit(prevState => ({
        ...prevState,
        sitePhotos: {
          ...prevState.sitePhotos,
          [fieldName]: file
        }
      }));
      setFileNames(prevState => ({
        ...prevState,
        [fieldName]: file.name
      }));
    }
  };
  const handleFileChangeInLevel = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      setLevelData(prevState => ({
        ...prevState,
        sitePhotos: {
          ...prevState.sitePhotos,
          [fieldName]: file
        }
      }));
      setFileNames(prevState => ({
        ...prevState,
        [fieldName]: file.name
      }));
    }
  };
  const handleFileChangeInFloorFront = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      setFloorFrontData(prevState => ({
        ...prevState,
        sitePhotos: {
          ...prevState.sitePhotos,
          [fieldName]: file
        }
      }));
      setFileNames(prevState => ({
        ...prevState,
        [fieldName]: file.name
      }));
    }
  };

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
  useEffect(() => {
    onDataChange(dimentionsData);
  }, [dimentionsData]);
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
              <div>
                <label
                  className={`dimension-btn ${
                    fileNames["pit"] ? "dimension-btn-background" : ""
                  }`}
                >
                  <span>Pit</span>
                  <img src="./uploadIcon.png " className="upload-icon" />
                  <input
                    className="hidden-input"
                    type="file"
                    onChange={(e) => handleFileChangeInPit(e, "pit")}
                  
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
                    <img src="./uploadIcon.png " className="upload-icon" />
                    <input
                      className="hidden-input"
                      type="file"
                      onChange={(e) => handleFileChangeInPit(e, "bottomToTop")}
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
                    <img src="./uploadIcon.png " className="upload-icon" />
                    <input
                      className="hidden-input"
                      type="file"
                      onChange={(e) => handleFileChangeInPit(e, "basementFront")}
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

          {Flevel &&
            Flevel.slice(1, -1).map((val, index) => {
              const uniqueKey = `floor-${index}`;
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
                        <div>
                          <label
                            className={`dimension-btn ${
                              fileNames[uniqueKey]
                                ? "dimension-btn-background"
                                : ""
                            }`}
                          >
                            <span>Floor Front</span>
                            <img
                              src="./uploadIcon.png "
                              className="upload-icon"
                            />
                            <input
                              className="hidden-input"
                              type="file"
                              onChange={(e) =>
                                handleFileChangeInLevel(e, uniqueKey)
                              }
                            />
                          </label>

                          {fileNames[uniqueKey] && (
                            <div className="file-name">
                              {fileNames[uniqueKey]}
                            </div>
                          )}
                        </div>
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
              <div>
                <label
                  className={`dimension-btn ${
                    fileNames["topFloorFront"] ? "dimension-btn-background" : ""
                  }`}
                >
                  <span>Floor Front</span>
                  <img src="./uploadIcon.png " className="upload-icon" />
                  <input
                    className="hidden-input"
                    type="file"
                    onChange={(e) => handleFileChangeInFloorFront(e, "topFloorFront")}
                  />
                </label>
                {fileNames["topFloorFront"] && (
                  <div className="file-name">{fileNames["topFloorFront"]}</div>
                )}
              </div>
              <div className="dimension-btn-wrapper">
                <div>
                  <label
                    className={`dimension-btn ${
                      fileNames["topToBottom"] ? "dimension-btn-background" : ""
                    }`}
                  >
                    <span>Top to Bottom</span>
                    <img src="./uploadIcon.png " className="upload-icon" />
                    <input
                      className="hidden-input"
                      type="file"
                      onChange={(e) => handleFileChangeInFloorFront(e, "topToBottom")}
                    />
                  </label>

                  {fileNames["topToBottom"] && (
                    <div className="file-name">{fileNames["topToBottom"]}</div>
                  )}
                </div>
              </div>
              <div className="dimension-btn-wrapper">
                <div>
                  <label
                    className={`dimension-btn ${
                      fileNames["Overhead"]
                        ? "dimension-btn-background"
                        : ""
                    }`}
                  >
                    <span>Overhead</span>
                    <img src="./uploadIcon.png " className="upload-icon" />
                    <input
                      className="hidden-input"
                      type="file"
                      onChange={(e) => handleFileChangeInFloorFront(e, "Overhead")}
                    />
                  </label>
                  {fileNames["Overhead"] && (
                    <div className="file-name">
                      {fileNames["Overhead"]}
                    </div>
                  )}
                </div>
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
