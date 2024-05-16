import React, { useEffect, useState } from "react";
import TextInputs from "./ClientsReusableComponent/TextInput";

const ElevatorFormDetails = ({
  degree = {},
  openings,
  handleDegreeSelection,
}) => {
  const [clientFormData, setClientFormData] = useState({
    pitdepth: "300",
    purpose: "Hospital",
    stops: "02",
    doortype: "type",
    numberofopenings: "04",
    
  });

  const [click, setClick] = useState({});
  const sourceOfLead = ["Website", "Reference"];

  const hadleInputChnage = (e) => {
    const { name, value } = e.target;
    setClientFormData({ ...clientFormData, [name]: value });
  };

  const handleClick = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: false });
  };

  const handleClickFalse = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: false });
  };

  useEffect(() => {}, [clientFormData]);
  return (
    <div className="elevator-form-details">
      <div className="elevator-form-input-wrapper">
        <div className="client-form-input-wrapper-child">
          <div className="mmbtn-parent">
            <TextInputs
              label={"Pit depth"}
              name={"pitdepth"}
              
              onFocus={handleClick}
              value={clientFormData.pitdepth}
              onChange={hadleInputChnage}
              click={click.pitdepth}
              w="25vw"
              onBlur={handleClickFalse}
            />
            {/* <span className="mmBtn mm-btn-possition">mm</span> */}
          </div>
        </div>

        <div>
          <TextInputs
            label={"Purpose"}
            name={"purpose"}
            onFocus={handleClick}
            value={clientFormData.purpose}
            onChange={hadleInputChnage}
            click={click.purpose}
            w="25vw"
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInputs
            label={"Stops"}
            name={"stops"}
            onFocus={handleClick}
            value={clientFormData.stops}
            onChange={hadleInputChnage}
            click={click.stops}
            w="25vw"
            onBlur={handleClickFalse}
          />
        </div>

        <div>
          <TextInputs
            label={"Door Type"}
            name={"doortype"}
            onFocus={handleClick}
            value={clientFormData.doortype}
            onChange={hadleInputChnage}
            click={click.doortype}
            w="25vw"
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInputs
            label={"Number of Openings"}
            name={"numberofopenings"}
            onFocus={handleClick}
            value={clientFormData.numberofopenings}
            onChange={hadleInputChnage}
            click={click.numberofopenings}
            w="25vw"
            onBlur={handleClickFalse}
          />
        </div>
      </div>

      <div className="degree-form-details">
        <div>
          <div
            className={
              openings === 0 || openings === 1
                ? "degree-container disabled"
                : "degree-container"
            }
          >
            <>
              <span
                className={`degree-container-children ${
                  degree === "90dL" ? "degree-selector" : ""
                }`}
                onClick={() => handleDegreeSelection("90dL")}
              >
                90°left
              </span>
              <span
                className={`degree-container-children ${
                  degree.nintyDegreeRight ? "degree-selector" : ""
                }`}
                onClick={() => handleDegreeSelection("90dR")}
              >
                90°right
              </span>
              <span
                className={`degree-container-children ${
                  degree.oneEightyDegree ? "degree-selector" : ""
                }`}
                onClick={() => handleDegreeSelection("180d")}
              >
                180°degree
              </span>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElevatorFormDetails;
