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

  // const [numberOfOpening , setnumberOfOpening ] = useState(0);
  // const [stops, setStops] = useState(0);
  // const [data, setData] = useState("G");

  const [elevatorDetails, setElevatorDetails] = useState({
    pit: "",
    type: "",
    purpose: "",
    capacity: "",
    capacityUnit: "kg",
    stops: 0,
    groundOrStilt: "G",
    basementSelection: { b1: false, b2: false },
    doorType: "",
    constructionMaterial: "",
    numberOfOpening: "",
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
  //   isBasementSelection((prev) => ({
  //     b1: (prev.b1 = "B1"),
  //     b2: prev.b2 === "B2" ? "" : "B2",
  //   }));
  // };

  const handleInputValueChange = (field, newValue) => {
    setValForDimention(newValue);
    // setStops(newValue);]
    // console.log(field, newValue);
    handleElevatorDetailsChange(field, newValue)
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
    let values = Object.values(elevatorDetails.degree).filter((value) => value !== "");

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
  // console.log("numberOfOpening ", elevatorDetails);
  const handleNumberOfOpenings = (openings) => {
    // setnumberOfOpening (openings);
    // setDegdree({
    //   nintyDegreeRight: "",
    //   nintyDegreeLeft: "",
    //   oneEightyDegree: "",
    // });
    handleElevatorDetailsChange("numberOfOpening ", openings);
    handleElevatorDetailsChange("degree", {
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


  function setDefaultData(openings) {
    const ele = [];
    for (let i = 0; i < Flevel.length; i++) {
      ele.push({ level: Flevel[i], openings: [] });
    }
    setElevatorOpenings(ele);
    setLevelAndOpeningsView(openings);
  }

  const handleDegreeSelection = (value) => {
    setLevelAndOpeningsView(elevatorDetails.numberOfOpening);
    setDefaultData(elevatorDetails.numberOfOpening);
    if (elevatorDetails.numberOfOpening === 2) {
      handleElevatorDetailsChange("degree", {
        nintyDegreeRight: false,
        nintyDegreeLeft: false,
        oneEightyDegree: false,
      })
    } else if (elevatorDetails.numberOfOpening === 3) {
      const R90 = elevatorDetails.degree.nintyDegreeRight;
      const L90 = elevatorDetails.degree.nintyDegreeLeft;
      const back = elevatorDetails.degree.oneEightyDegree;

      if (R90 && L90) {
        // console.log("thisnis", R90, L90, back);
        handleElevatorDetailsChange("degree", {
          nintyDegreeRight: true,
          nintyDegreeLeft: false,
          oneEightyDegree: false,
        })
        // setDegdree((prevState) => ({
        //   ...prevState,
        //   nintyDegreeLeft: "",
        // }));
      } else if (L90 && back) {
        handleElevatorDetailsChange("degree", {
          nintyDegreeRight: false,
          nintyDegreeLeft: true,
          oneEightyDegree: false,
        })
        // setDegdree((prevState) => ({
        //   ...prevState,
        //   oneEightyDegree: "",
        // }));
      } else if (R90 && back) {
        handleElevatorDetailsChange("degree", {
          nintyDegreeRight: true,
          nintyDegreeLeft: false,
          oneEightyDegree: false,
        })
        // setDegdree((prevState) => ({
        //   ...prevState,
        //   nintyDegreeRight: "",
        // }));
      }
    }
    // console.log("this is handleElevatorDetailsChange: ",elevatorDetails.degree);
    const degreeDetail = elevatorDetails.degree;
    // console.log("This is degreeDetail ", degreeDetail);

    switch (value) {
      case "90dL":
        handleElevatorDetailsChange("degree", {
          ...degreeDetail, nintyDegreeLeft: !degreeDetail.nintyDegreeLeft
        })
        // setDegdree((prevState) => ({
        //   ...prevState,
        //   nintyDegreeLeft: prevState.nintyDegreeLeft ? "" : "90dL",
        // }));

        break;
      case "90dR":
        handleElevatorDetailsChange("degree", {
          ...degreeDetail, nintyDegreeRight: !degreeDetail.nintyDegreeRight
        })
        // setDegdree((prevState) => ({
        //   ...prevState,
        //   nintyDegreeRight: prevState.nintyDegreeRight ? "" : "90dR",
        // }));

        break;
      case "180d":
        handleElevatorDetailsChange("degree", {
          ...degreeDetail, oneEightyDegree: !degreeDetail.oneEightyDegree
        })
        // setDegdree((prevState) => ({
        //   ...prevState,
        //   oneEightyDegree: prevState.oneEightyDegree ? "" : "180d",
        // }));
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


  return (
    <div className="client-form-elevator-details">
      <h5 className="client-form-details-heading">Elevator Details</h5>
      <hr className="client-form-hr" />

      <div className="dimenstions-container">
        <ElevatorDetails pitDepth={pitDepth} typeOptions={typeOptions} purpose={purpose}
          capacity={elevatorDetails.capacity} capacityUnit={elevatorDetails.capacityUnit} handleInputValueChange={handleInputValueChange} basementSelection={elevatorDetails.basementSelection}
          doorType={doorType} constructionMaterial={constructionMaterial} numberOfOpenings={numberOfOpenings}
          handleNumberOfOpenings={handleNumberOfOpenings} degree={elevatorDetails.degree} handleDegreeSelection={handleDegreeSelection} openings={elevatorDetails.numberOfOpening}
          handleElevatorDetailsChange={handleElevatorDetailsChange}
          groundOrStilt={elevatorDetails.groundOrStilt}
        />

        {elevatorDetails.numberOfOpening !== 0 && elevatorDetails.stops !== 0 && Object.values(elevatorDetails.degree).filter(val => val !== false).length === elevatorDetails.numberOfOpening && (
          <> <ElevatorOpeningSelection Flevel={Flevel} numberOfOpening={elevatorDetails.numberOfOpening} degree={elevatorDetails.degree} array={array} handleClick={handleClick} /></>
        )}

        <div className="text-area-container">
          <textarea placeholder="Add Remarks"></textarea>
        </div>
      </div>
    </div>
  );
};

export default ClientFormElevatorDetails;
