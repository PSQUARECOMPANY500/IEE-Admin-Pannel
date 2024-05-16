import React, { useEffect, useState } from "react";
import ElevatorFormDetails from "./ElevatorFormDetails";
import ViewDimensionBtn from "./ClientsReusableComponent/ViewDimensionBtn";
import LeftElevatorDetails from "./LeftElevatorDetails";
import ElevatorOpeningSelection from "./ElevatorOpeningSelection";
import BasementFormElevatorDetails from "./BasementFormElevatorDetails";
import FloorFormElevator from "./FloorFormElevator";
import { HiArrowLeft } from "react-icons/hi";

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
                    pitDepth={["1000mm", "1500mm", "2000mm"]}
                    typeOptions={["Type A", "Type B", "Type C"]}
                    purpose={["Residential", "Commercial", "Industrial"]}
                    capacity={"1000"}
                    degree={{}}
                    capacityUnit={"Pr"}
                    basementSelection={{ b1: true, b2: false }}
                    doorType={["Manual", "Automatic"]}
                    constructionMaterial={["Steel", "Aluminum"]}
                    numberOfOpenings={["1", "2", "3"]}
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
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="client-form-heading-arrow" onClick={handleBackPage}>
                  <HiArrowLeft
                   className="client-form-left-arrow" />

                  <h5>Dimensions</h5>
                  <span className="client-form-heading-line"></span>
                </div>
                <div className="client-form-next-floor">
                  <BasementFormElevatorDetails />

                  <FloorFormElevator />
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
