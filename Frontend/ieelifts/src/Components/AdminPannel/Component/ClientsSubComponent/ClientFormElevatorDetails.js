// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React, { useState, useEffect } from "react";

import ElevatorOpeningSelection from "./ElevatorOpeningSelection"
import ElevatorDetails from "./ElevatorDetails";

const ClientFormElevatorDetails = ({
  setValForDimention,
  setFLevel,
  Flevel,
}) => {
  const numberOfOpenings = [1, 2, 3];
  const pitDepth = [100, 200];
  const purpose = ["Hospital", "Mall"];
  const typeOptions = ["gearless", "geared"];
  const doorType = ["option1", "option2"];
  const constructionMaterial = ["option1", "option2"];

  // const [dropdown, setDropdown] = useState({
  //   purpose: "",
  //   doorType: "",
  //   constructionMaterial: "",
  // });

  // //States
  // const [pit, setPit] = useState("");
  // const [type, setType] = useState("");
  // const [capacity, setCapacity] = useState("kg");
  // const [basementSelection, isBasementSelection] = useState({ b1: "", b2: "" });
  // const [degree, setDegdree] = useState({
  //   nintyDegreeLeft: "",
  //   nintyDegreeRight: "",
  //   oneEightyDegree: "",
  // });

  // const [noOfOpenings, setNoOfOpenings] = useState(0);
  // const [stops, setStops] = useState(0);
  // const [data, setData] = useState("G");

  const [elevatorDetails, setElevatorDetails] = useState({
    pit: "",
    type: "",
    purpose: "",
    capacity: "",
    stops: 0,
    groundOrStilt: "",
    basementSelection: { b1: false, b2: false },
    doorType: "",
    constructionMaterial: "",
    noOfOpenings: "",
    degree: {
      nintyDegreeLeft: false,
      nintyDegreeRight: false,
      oneEightyDegree: false,
    },
    remarks: ""
  })
  const handleElevatorDetailsChange = (fieldName, value) => {
    setElevatorDetails(prevDetails => ({
      ...prevDetails,
      [fieldName]: value
    }));
  };
  // let elevatorOpenings = []
  const [elevatorOpenings, setElevatorOpenings] = useState([]);

  useEffect(() => {
    let level = [];
    let count = elevatorDetails.stops;
    if (elevatorDetails.basementSelection.b2) {
      level.push("B1", "B2");
      count -= 2;
    } else if (elevatorDetails.basementSelection.b1 && elevatorDetails.basementSelection.b2) {
      level.push("B1");
      count -= 1;
    } else if (elevatorDetails.basementSelection.b1 && elevatorDetails.basementSelection.b2) {
      level.push("B1", "B2");
      count -= 2;
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

  }, [elevatorDetails.stops, elevatorDetails.groundOrStilt, elevatorDetails.basementSelection]);


  const [array, setArray] = useState([]);

  //handler
  // const handleContructionMaterial = (value) => {
  //   setDropdown((prevState) => ({
  //     ...prevState,
  //     constructionMaterial: value,
  //   }));
  // };
  // const handlePurpose = (value) => {
  //   setDropdown((prevState) => ({
  //     ...prevState,
  //     purpose: value,
  //   }));
  // };
  // const handleDoorType = (value) => {
  //   setDropdown((prevState) => ({
  //     ...prevState,
  //     doorType: value,
  //   }));
  // };
  // const handleCapacityUnitChange = (unit) => {
  //   setCapacity(unit);
  // };

  // const handleChange = (value) => {
  //   setData(value);
  // };
  // const handleChangeInB1 = () => {
  //   isBasementSelection((prev) => ({
  //     b1: prev.b1 === "B1" ? "" : "B1",
  //     b2: prev.b2 === "B2" ? "" : "",
  //   }));
  // };

  // const handleChangeInB2 = () => {
  //   console.log("Clicked");
  //   isBasementSelection((prev) => ({
  //     b1: (prev.b1 = "B1"),
  //     b2: prev.b2 === "B2" ? "" : "B2",
  //   }));
  // };

  const handleInputValueChange = (newValue) => {
    setValForDimention(newValue);
    // setStops(newValue);
    handleElevatorDetailsChange(stops, newValue)
  };
  // const handlePitValueChange = (pit) => {
  //   setPit(pit);
  // };
  // const handleType = (value) => {
  //   setType(value);
  // };

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
    // setNoOfOpenings(openings);
    // setDegdree({
    //   nintyDegreeRight: "",
    //   nintyDegreeLeft: "",
    //   oneEightyDegree: "",
    // });
    handleElevatorDetailsChange("noOfOpenings", openings);
    handleElevatorDetailsChange(basementSelection, {
      nintyDegreeRight: false,
      nintyDegreeLeft: false,
      oneEightyDegree: false,
    })
    const ele = [];
    for (let i = 0; i < Flevel.length; i++) {
      ele.push({ level: Flevel[i], openings: [] });
    }
    setElevatorOpenings(ele);
    setLevelAndOpeningsView(openings);
  };

  const isDivDisabled = () => {
    if (noOfOpenings === 0 || noOfOpenings === 1) {
      return true;
    } else {
      return false;
    }
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
    setLevelAndOpeningsView(noOfOpenings);
    setDefaultData(noOfOpenings);
    if (noOfOpenings === 2) {
      setDegdree({
        nintyDegreeLeft: "",
        nintyDegreeRight: "",
        oneEightyDegree: "",
      });
    } else if (noOfOpenings === 3) {
      const R90 = degree.nintyDegreeRight;
      const L90 = degree.nintyDegreeLeft;
      const back = degree.oneEightyDegree;

      if (R90 === "90dR" && L90 === "90dL") {
        setDegdree((prevState) => ({
          ...prevState,
          nintyDegreeLeft: "",
        }));
      } else if (L90 === "90dL" && back === "180d") {
        setDegdree((prevState) => ({
          ...prevState,
          oneEightyDegree: "",
        }));
      } else if (R90 === "90dR" && back === "180d") {
        setDegdree((prevState) => ({
          ...prevState,
          nintyDegreeRight: "",
        }));
      }
    }

    switch (value) {
      case "90dL":
        setDegdree((prevState) => ({
          ...prevState,
          nintyDegreeLeft: prevState.nintyDegreeLeft ? "" : "90dL",
        }));

        break;
      case "90dR":
        setDegdree((prevState) => ({
          ...prevState,
          nintyDegreeRight: prevState.nintyDegreeRight ? "" : "90dR",
        }));

        break;
      case "180d":
        setDegdree((prevState) => ({
          ...prevState,
          oneEightyDegree: prevState.oneEightyDegree ? "" : "180d",
        }));
        break;
      default:
        break;
    }
  };

  const setLevelAndOpeningsView = (openings) => {
    const arrayTobe = Array.from({ length: stops }, () =>
      Array(openings).fill(false)
    );
    setArray(arrayTobe);
  };
  const count = Object.values(degree).reduce(
    (acc, val) => acc + (val ? 1 : 0),
    0
  );

  return (
    <div className="client-form-elevator-details">
      <h5 className="client-form-details-heading">Elevator Details</h5>
      <hr className="client-form-hr" />

      <div className="dimenstions-container">
        <ElevatorDetails pitDepth={pitDepth} handlePitValueChange={handlePitValueChange} typeOptions={typeOptions} handleType={handleType} purpose={purpose} handlePurpose={handlePurpose}
          capacity={capacity} handleCapacityUnitChange={handleCapacityUnitChange} handleInputValueChange={handleInputValueChange} basementSelection={basementSelection}
          handleChangeInB2={handleChangeInB2} handleChangeInB1={handleChangeInB1} data={data} handleChange={handleChange}
          doorType={doorType} handleDoorType={handleDoorType} constructionMaterial={constructionMaterial} handleContructionMaterial={handleContructionMaterial} numberOfOpenings={numberOfOpenings}
          handleNumberOfOpenings={handleNumberOfOpenings} isDivDisabled={isDivDisabled} degree={degree} handleDegreeSelection={handleDegreeSelection}
        />
        {noOfOpenings !== 0 && stops !== 0 && count === noOfOpenings - 1 ? (
          <> <ElevatorOpeningSelection Flevel={Flevel} noOfOpenings={noOfOpenings} degree={degree} array={array} handleClick={handleClick} /></>
        ) : (
          ""
        )}

        <div className="text-area-container">
          <textarea placeholder="Add Remarks"></textarea>
        </div>
      </div>
    </div>
  );
};

export default ClientFormElevatorDetails;
