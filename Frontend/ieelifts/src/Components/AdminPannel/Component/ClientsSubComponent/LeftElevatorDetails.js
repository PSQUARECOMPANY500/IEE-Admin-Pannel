import React, { useEffect, useState } from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import TextInputs from "./ClientsReusableComponent/TextInput";
import ElevatorInput from "./ClientsReusableComponent/ElevatorInput";

const LeftElevatorDetails = ({
  pitDepth,
  typeOptions,
  w,
  purpose,
  capacity,
  capacityUnit,
  handleInputValueChange,
  basementSelection,
  doorType,
  constructionMaterial,
  numberOfOpenings,
  degree,
  openings,
  handleElevatorDetailsChange,
  groundOrStilt,
  handleDegreeSelection,
}) => {
  const [clientFormData, setClientFormData] = useState({
    pitdepth: "Gearless",
    purpose: "Hospital",
    stops: "02",
    doortype: "type",
    numberofopenings: "04",
    contructionmaterial: "Type",
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
    <>
      <div className="client-elevator-input-wrapper-left">
        <div>
          <ElevatorInput
            label={"Types"}
            name={"types"}
            value={clientFormData.pitdepth}
            onChange={hadleInputChnage}
            w="25vw"
          />
        </div>

        <div className="capacity-container">
          <div>
            <AnimatedInput
              label={"10"}
              w="15vw"
              name={"courseName"}
              readOnly={true}
              disabled={true}
              onValueChange={() => handleInputValueChange("capacity")}
            />
          </div>
          <div className="left-selector-container">
            <div className="selector-container">
              <span
                className={`selector-child ${
                  capacityUnit === "kg" ? "selector-child-active" : ""
                }`}
                onClick={() =>
                  handleElevatorDetailsChange("capacityUnit", "kg")
                }
              >
                Kg
              </span>
              <span
                className={`selector-child ${
                  capacityUnit === "Pr" ? "selector-child-active" : ""
                }`}
                onClick={() =>
                  handleElevatorDetailsChange("capacityUnit", "Pr")
                }
              >
                Pr
              </span>
            </div>
          </div>
        </div>

        <div className="b2b1-container">
          <div>
            <div className="btn-container">
              <span
                className={`b2-btnleft ${
                  basementSelection.b2 ? "btn-active" : ""
                }`}
                onClick={() =>
                  handleElevatorDetailsChange("basementSelection", {
                    b1: !basementSelection.b2,
                    b2: !basementSelection.b2,
                  })
                }
              >
                B2
              </span>
              <span
                className={`b1-btnleft ${
                  basementSelection.b1 ? "btn-active" : ""
                }`}
                onClick={() =>
                  handleElevatorDetailsChange("basementSelection", {
                    b1: !basementSelection.b1,
                    b2: false,
                  })
                }
              >
                B1
              </span>
            </div>
          </div>
          <div className="selector-container-left">
            <span
              className={`selector-child ${
                groundOrStilt === "G" ? "selector-child-active" : ""
              }`}
              onClick={() => handleElevatorDetailsChange("groundOrStilt", "G")}
            >
              G
            </span>
            <span
              className={`selector-child ${
                groundOrStilt === "S" ? "selector-child-active" : ""
              }`}
              onClick={() => handleElevatorDetailsChange("groundOrStilt", "S")}
            >
              S
            </span>
          </div>
          <div></div>
        </div>

        <div>
         

          <ElevatorInput
            label={"Contruction Material"}
            name={"contructionmaterial"}
            onFocus={handleClick}
            value={clientFormData.contructionmaterial}
            onChange={hadleInputChnage}
            click={click.contructionmaterial}
            w="25vw"
            onBlur={handleClickFalse}
          />
        </div>
      </div>
    </>
  );
};

export default LeftElevatorDetails;
