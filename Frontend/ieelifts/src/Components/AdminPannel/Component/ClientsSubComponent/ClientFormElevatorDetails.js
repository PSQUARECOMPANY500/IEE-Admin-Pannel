// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React, { useState, useEffect } from "react";
import ElevatorOpeningSelection from "./ElevatorOpeningSelection";
import ElevatorDetails from "./ElevatorDetails";

const ClientFormElevatorDetails = ({
  setValForDimention,
  setFLevel,
  Flevel,
  onDataChange,
}) => {
  const [elevatorOpenings, setElevatorOpenings] = useState([]);
  const numberOfOpenings = [1, 2, 3];
  // const pitDepth = [100, 200];
  const purpose = ["Hospital", "Automobil", "Passenger"];
  const typeOptions = ["gearless", "geared"];
  const doorType = ["option1", "option2"];
  const constructionMaterial = ["option1", "option2"];
  const [elevatorData, setElevatorData] = useState({});
  const [array, setArray] = useState([]);
  const [degree, setDegree] = useState({
    nintyDegreeLeft: "",
    nintyDegreeRight: "",
    oneEightyDegree: "",
  });
  const [elevatorDetails, setElevatorDetails] = useState({
    pitDepth: "",
    type: "",
    purpose: "",
    capacity: "",
    capacityUnit: "",
    stops: "",
    groundOrStilt: "G",
    basementSelection: { b1: false, b2: false },
    doorType: "",
    constructionMaterial: "",
    numberOfOpenings: "",
    remarks: "",
  });
  

  //handler
  const handleElevatorDetailsChange = (fieldName, value) => {
    setElevatorDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: value,
    }));
    if (fieldName === "stops") {
      setDefaultData(value);
    }
  };

  useEffect(() => {
    let level = [];
    let count = elevatorDetails.stops;

    if (elevatorDetails.basementSelection.b2) {
      level.push("Basement 2", "Basement 1");
      count -= 2;
    } else if (elevatorDetails.basementSelection.b1) {
      level.push("B1");
      count -= 1;
    }

    if (elevatorDetails.groundOrStilt === "S") {
      level.push("Stilt");
    } else {
      level.push("Ground");
    }
    for (let i = 1; i < count; i++) {
      level.push(`Level ${i}`);
    }
    setFLevel(level);
  }, [
    elevatorDetails.stops,
    elevatorDetails.groundOrStilt,
    elevatorDetails.basementSelection,
  ]);

  const handleInputValueChange = (field, newValue) => {
    setValForDimention(newValue);
    handleElevatorDetailsChange(field, newValue);
  };

  const handleClick = (row, colIndex) => {
    setArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[row][colIndex] = !newArray[row][colIndex];
      return newArray;
    });
    let values = Object.values(degree).filter((value) => value !== "");
    values = ["original", ...values];

    const levelValue = Flevel[row];

    const updatedElevatorOpenings = elevatorOpenings.map((item) => {
      if (item.level === levelValue) {
        let newOpenings;
        if (item.openings.includes(values[colIndex])) {
          newOpenings = item.openings.filter(
            (value) => value !== values[colIndex]
          );
        } else {
          newOpenings = [...item.openings, values[colIndex]];
        }
        return { ...item, openings: newOpenings };
      }
      return item;
    });

    setElevatorOpenings(updatedElevatorOpenings);
  };
  const handleNumberOfOpenings = (openings) => {
    handleElevatorDetailsChange("numberOfOpenings ", openings);
    setDegree({
      nintyDegreeLeft: "",
      nintyDegreeRight: "",
      oneEightyDegree: "",
    });
    const ele = [];
    for (let i = 0; i < Flevel.length; i++) {
      ele.push({ level: Flevel[i], openings: [] });
    }
    setElevatorOpenings(ele);
    setLevelAndOpeningsView(openings);
  };

  function setDefaultData(openings) {
    const ele = [];
    for (let i = 0; i < Flevel.length; i++) {
      ele.push({ level: Flevel[i], openings: [] });
    }
    setElevatorOpenings(ele);
    setLevelAndOpeningsView(openings);
  }

  const handleDegreeSelection = (value) => {
    setLevelAndOpeningsView(elevatorDetails.numberOfOpenings);
    setDefaultData(elevatorDetails.numberOfOpenings);
    if (
      elevatorDetails.numberOfOpenings === 2 ||
      elevatorDetails.numberOfOpenings === 1
    ) {
      setDegree({
        nintyDegreeLeft: "",
        nintyDegreeRight: "",
        oneEightyDegree: "",
      });
    } else if (elevatorDetails.numberOfOpenings === 3) {
      const R90 = degree.nintyDegreeRight;
      const L90 = degree.nintyDegreeLeft;
      const back = degree.oneEightyDegree;

      if (R90 === "90dR" && L90 === "90dL") {
        setDegree((prevState) => ({
          ...prevState,
          nintyDegreeLeft: "",
        }));
      } else if (L90 === "90dL" && back === "180d") {
        setDegree((prevState) => ({
          ...prevState,
          oneEightyDegree: "",
        }));
      } else if (R90 === "90dR" && back === "180d") {
        setDegree((prevState) => ({
          ...prevState,
          nintyDegreeRight: "",
        }));
      }
    }

    switch (value) {
      case "90dL":
        setDegree((prevState) => ({
          ...prevState,
          nintyDegreeLeft: prevState.nintyDegreeLeft ? "" : "90dL",
        }));

        break;
      case "90dR":
        setDegree((prevState) => ({
          ...prevState,
          nintyDegreeRight: prevState.nintyDegreeRight ? "" : "90dR",
        }));

        break;
      case "180d":
        setDegree((prevState) => ({
          ...prevState,
          oneEightyDegree: prevState.oneEightyDegree ? "" : "180d",
        }));
        break;
      default:
        break;
    }
  };

  const setLevelAndOpeningsView = (openings) => {
    const arrayTobe = Array.from({ length: elevatorDetails.stops }, () =>
      Array(openings).fill(false)
    );
    setArray(arrayTobe);
  };

  //remarks handler
  const handleRemarksChange = (event) => {
    setElevatorDetails({
      ...elevatorDetails,
      remarks: event.target.value,
    });
  };
  useEffect(() => {
    onDataChange();
  }, []);

  // console.log("elevatorDetails", elevatorDetails);
  // console.log("degree", degree);
  // console.log("elevatorOpenings", elevatorOpenings);
  useEffect(() => {
    setElevatorData((prevData) => ({
      ...prevData,
      ...elevatorDetails,
      degree,
      elevatorOpenings,
    }));
  }, [elevatorDetails, degree, elevatorOpenings]);
  useEffect(() => {
    onDataChange(elevatorData);
  }, [elevatorData]);
  console.log("elevatorData", elevatorData);
  return (
    <div className="client-form-elevator-details">
      <h5 className="client-form-details-heading">Elevator Details</h5>
      <hr className="client-form-hr" />

      <div className="dimenstions-container">
        <ElevatorDetails
          pitDepth={elevatorDetails.pitDepth}
          typeOptions={typeOptions}
          purpose={purpose}
          capacity={elevatorDetails.capacity}
          capacityUnit={elevatorDetails.capacityUnit}
          handleInputValueChange={handleInputValueChange}
          basementSelection={elevatorDetails.basementSelection}
          doorType={doorType}
          constructionMaterial={constructionMaterial}
          numberOfOpenings={numberOfOpenings}
          handleNumberOfOpenings={handleNumberOfOpenings}
          degree={degree}
          handleDegreeSelection={handleDegreeSelection}
          openings={elevatorDetails.numberOfOpenings}
          stops={elevatorDetails.stops}
          handleElevatorDetailsChange={handleElevatorDetailsChange}
          groundOrStilt={elevatorDetails.groundOrStilt}
        />

        {elevatorDetails.numberOfOpenings !== 0 &&
          elevatorDetails.stops !== 0 &&
          Object.values(degree).filter((val) => val !== "").length ===
            elevatorDetails.numberOfOpenings - 1 && (
            <>
              {" "}
              <ElevatorOpeningSelection
                Flevel={Flevel}
                numberOfOpenings={elevatorDetails.numberOfOpenings}
                degree={degree}
                array={array}
                handleClick={handleClick}
              />
            </>
          )}

        <div className="text-area-container">
          <textarea
            placeholder="Add Remarks"
            value={elevatorDetails.remarks}
            onChange={handleRemarksChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ClientFormElevatorDetails;
