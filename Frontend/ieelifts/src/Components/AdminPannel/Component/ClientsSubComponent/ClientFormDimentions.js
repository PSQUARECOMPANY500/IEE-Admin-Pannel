// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React, { useState, useEffect, useMemo } from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import TextInput from "./ClientsReusableComponent/TextInput";
import DimentionPitFloor from "./DimentionsPitFloor";
import DimentionFloorTop from "./DimentionFloorTop";
import { DimentionMidFloor } from "./DimentionMidFloor";
const ClientFormDimentions = ({
  valforDimention,
  Flevel,
  validate,
  forSecondClick,
  onDataChange,
}) => {
  // console.log("validata in dimension", validate)
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
    imageChanged: false,
    isSet: false,
  });
  // console.log("basementWithPit", basementWithPit);
  const [floorFrontData, setFloorFrontData] = useState({
    shaftWidth: "",
    shaftDepth: "",
    doorWidth: "",
    doorHeight: "",
    overhead: "",
    imageChanged: false,
    isSet: false,
  });

  const [fileNames, setFileNames] = useState({});

  useEffect(() => {
    const initialFormData = Flevel.slice(1, -1).map(() => ({
      shaftWidth: "",
      shaftDepth: "",
      doorWidth: "",
      doorHeight: "",
      floorToFloorHeight: "",
      fl: "",
      fr: "",
      imageChanged: false,
      isSet: false,
    }));
    setLevelData(initialFormData);
  }, [Flevel]);
  const [dimentionsData, setDimentionsData] = useState({
    basementWithPit: basementWithPit,
    floorFrontData: floorFrontData,
    levelData: levelData,
  });

  useEffect(() => {
    setDimentionsData({
      basementWithPit: basementWithPit,
      floorFrontData: floorFrontData,
      levelData: levelData,
    });
  }, [basementWithPit, floorFrontData, levelData]);
  console.log("dimentionsData", dimentionsData);
  //handler

  const handleFileChangeInPit = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      setBasementWithPit((prevState) => ({
        ...prevState,
        sitePhotos: {
          ...prevState.sitePhotos,
          [fieldName]: file,
        },
      }));
      setFileNames((prevState) => ({
        ...prevState,
        [fieldName]: file.name,
      }));
    }
  };
  const handleFileChangeInLevel = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      setLevelData((prevState) => ({
        ...prevState,
        sitePhotos: {
          ...prevState.sitePhotos,
          [fieldName]: file,
        },
      }));
      setFileNames((prevState) => ({
        ...prevState,
        [fieldName]: file.name,
      }));
    }
  };
  const handleFileChangeInFloorFront = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      setFloorFrontData((prevState) => ({
        ...prevState,
        sitePhotos: {
          ...prevState.sitePhotos,
          [fieldName]: file,
        },
      }));
      setFileNames((prevState) => ({
        ...prevState,
        [fieldName]: file.name,
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
  //-----------------------pagination state and handler------------------------------
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  //---------------------------------------------------------------------------------
  return (
    <div className="client-form-dimensions">
      <h5 className="client-form-details-heading">Dimensions</h5>
      <hr className="client-form-hr" />
      <div
        className={`dimention-btn ${visible ? "hide" : ""} ${
          validate ? "disabled" : ""
        }`}
        onClick={handleOnClick}
      >
        Generate dimensions{" "}
        <img src="generateicon.png" alt="icon" className="generateIcon" />
      </div>
      {visible && (
        <div className="dimenstions-container">
          {/* basement component */}
          <DimentionPitFloor
            basementWithPit={basementWithPit}
            handleClick={handleClick}
            handleInputChangeInPit={handleInputChangeInPit}
            click={click}
            handleFileChangeInPit={handleFileChangeInPit}
            fileNames={fileNames}
            handleClickFalse={handleClickFalse}
            Flevel={Flevel}
          />
          {/* floor mid component*/}
          <DimentionMidFloor
            levelData={levelData}
            handleClick={handleClick}
            handleInputChange={handleInputChange}
            click={click}
            handleFileChangeInLevel={handleFileChangeInLevel}
            fileNames={fileNames}
            handleClickFalse={handleClickFalse}
            Flevel={Flevel}
          />

          {/* floor top component*/}
          <DimentionFloorTop
            floorFrontData={floorFrontData}
            handleClick={handleClick}
            handleInputChangeInPFloorFront={handleInputChangeInPFloorFront}
            click={click}
            handleFileChangeInFloorFront={handleFileChangeInFloorFront}
            fileNames={fileNames}
            handleClickFalse={handleClickFalse}
          />

          {/* pagination */}
          <div className="dimention-pagination-btn-wrapper">
            <span
              onClick={() =>
                handlePageChange(currentPage > 0 ? currentPage - 1 : 0)
              }
            >
              <img src="leftBtn.png" alt="leftBtn" />
            </span>
            <span
              onClick={() =>
                handlePageChange(
                  currentPage < Math.ceil(Flevel.length / itemsPerPage) - 1
                    ? currentPage + 1
                    : currentPage
                )
              }
            >
              <img src="rightBtn.png" alt="rightBtn" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientFormDimentions;
