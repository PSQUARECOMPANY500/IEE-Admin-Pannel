// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React, { useState, useEffect, useMemo } from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import TextInput from "./ClientsReusableComponent/TextInput";
import DimentionPitFloor from "./DimentionsPitFloor";
import DimentionFloorTop from "./DimentionFloorTop";
import { DimentionMidFloor } from "./DimentionMidFloor";

// import { updateClientFormUsingPagination } from "../../../../ReduxSetup/Actions/AdminActions";
// import { useDispatch } from "react-redux";
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
  // const dispatch = useDispatch();
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
    const initialFormData = Flevel.map(() => ({
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
      levelData: levelData,
      floorFrontData: floorFrontData,
    });
  }, [basementWithPit, floorFrontData, levelData]);
  // console.log("dimentionsData", dimentionsData);
  //handler
  // console.log("leveldata===>", levelData);
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
    // console.log("handleInputChange====", index);
    const { name, value } = event.target;
    const toBeUpdate = levelData[index];
    toBeUpdate[name] = value;

    // Find the index of the item to be updated in newFormData

    const newFormData = { ...levelData };
    // If the item is found, update it in newFormData
    newFormData[index] = toBeUpdate;

    // console.log(newFormData[index], value, name);

    // newFormData[index] = {
    //   ...newFormData[index],
    //   [name]: value,
    // };
    setLevelData(newFormData);
  };
  const handleClick = (e) => {
    const { id } = e.target;
    setClick((prevClick) => ({ ...prevClick, [id]: true }));
  };

  const handleClickFalse = (e) => {
    const { id } = e.target;
    setClick((prevClick) => ({ ...prevClick, [id]: false }));
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

  return (
    <div className="client-form-dimensions">
      <h5 className="client-form-details-heading">Dimensions</h5>
      <hr className="client-form-hr" />
      <div
        className={`dimention-btn ${visible ? "hide" : ""}   ${
          !validate ? "disabled" : ""
        } `}
        onClick={handleOnClick}
      >
        Generate dimensions{" "}
        <img src="generateicon.png" alt="icon" className="generateIcon" />
      </div>
      {visible && (
        <div className="dimenstions-container">
          {Flevel.slice(startIndex, endIndex).map((level, index) => (
            <React.Fragment key={startIndex + index}>
              {startIndex + index === 0 && (
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
              )}
              {startIndex + index > 0 &&
                startIndex + index < Flevel.length - 1 && (
                  <DimentionMidFloor
                    levelData={levelData}
                    handleClick={handleClick}
                    handleInputChange={(e) =>
                      handleInputChange(startIndex + index, e)
                    }
                    click={click}
                    handleFileChangeInLevel={(e) =>
                      handleFileChangeInLevel(e, startIndex + index)
                    }
                    fileNames={fileNames}
                    handleClickFalse={handleClickFalse}
                    Flevel={Flevel}
                    LevelName={Flevel[startIndex + index]}
                    index={startIndex + index}
                  />
                )}
              {startIndex + index === Flevel.length - 1 && (
                <DimentionFloorTop
                  floorFrontData={floorFrontData}
                  handleClick={handleClick}
                  handleInputChangeInPFloorFront={
                    handleInputChangeInPFloorFront
                  }
                  click={click}
                  handleFileChangeInFloorFront={handleFileChangeInFloorFront}
                  fileNames={fileNames}
                  handleClickFalse={handleClickFalse}
                />
              )}
            </React.Fragment>
          ))}
          <div className="dimention-pagination-btn-wrapper">
            {currentPage > 0 && (
              <span
                className="pagination-btn left"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <img src="leftLightBtn.png" alt="leftBtn" />
              </span>
            )}
            {currentPage < Math.ceil(Flevel.length / itemsPerPage) - 1 && (
              <span
                className="pagination-btn right"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <img src="rightLightBtn.png" alt="rightBtn" />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientFormDimentions;
