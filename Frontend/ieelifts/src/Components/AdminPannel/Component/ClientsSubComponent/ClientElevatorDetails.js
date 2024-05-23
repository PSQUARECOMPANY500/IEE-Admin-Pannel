import React, { useEffect, useState } from "react";
import ElevatorFormDetails from "./ElevatorFormDetails";
import ViewDimensionBtn from "./ClientsReusableComponent/ViewDimensionBtn";
import LeftElevatorDetails from "./LeftElevatorDetails";
import ElevatorOpeningSelection from "./ElevatorOpeningSelection";
import { HiArrowLeft } from "react-icons/hi";
import ClientElevatorForm from "./ClientElevatorForm";

const ClientElevatorDetails = () => {
  const [Flevel, setFLevel] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [selectedDegree, setSelectedDegree] = useState("90dL");

  const array = [
    [true, false],
    [false, true],
    [true, false],
    [true, false],
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const handleNextPage = () => {
    setToggle(false);
  };
  const handleBackPage = () => {
    setToggle(true);
  };

  const handleDegreeSelection = (degree) => {
    setSelectedDegree(degree);
  };

  return (
    <>
      <div className="client-elevator-main">
        <div className="add-client-elevator">
          <div>
            {toggle ? (
              <div className="client-form-elevator">
                <ElevatorFormDetails
                  handleDegreeSelection={handleDegreeSelection}
                  degree={selectedDegree}
                />

                <div className="client-form-elevator-details">
                  <LeftElevatorDetails
                    degree={{}}
                    capacityUnit={"Pr"}
                    basementSelection={{ b1: true, b2: false }}
                    groundOrStilt={"G"}
                    handleInputValueChange={() => {}}
                    handleElevatorDetailsChange={() => {}}
                    handleDegreeSelection={() => {}}
                  />
                </div>

                <div className="viewdimension-Button">
                  <ViewDimensionBtn
                    value={"View dimension"}
                    className={"elavator-form-button-yellow"}
                    handleNextPage={handleNextPage}
                  />
                </div>

                <div className="Elevator-Opening-Selection">
                  <ElevatorOpeningSelection
                    Flevel={Flevel}
                    degree={{}}
                    array={array}
                    handleClick={() => {}}
                    isClient={true}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="client-form-heading-arrow">
                  <div
                    onClick={handleBackPage}
                    className="client-form-heading-arrowInner"
                  >
                    <HiArrowLeft className="client-form-left-arrow" />

                    <h5>Dimensions</h5>
                  </div>
                  <span className="client-form-heading-line"></span>
                </div>
                <div className="client-form-next-floor">
                 

                  <ClientElevatorForm/>





                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientElevatorDetails;