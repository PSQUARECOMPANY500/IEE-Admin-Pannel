import React from 'react'
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import ClientDropdown from "./ClientsReusableComponent/ClientDropdown";

const ElevatorDetails = ({ pitDepth, handlePitValueChange, typeOptions, handleType, purpose, handlePurpose, capacity, handleCapacityUnitChange, handleInputValueChange, basementSelection, handleChangeInB2, handleChangeInB1, data, handleChange, doorType, handleDoorType, constructionMaterial, handleContructionMaterial, numberOfOpenings, handleNumberOfOpenings, isDivDisabled, degree, handleDegreeSelection }) => {
    return (
        <>
            <div className="client-elevator-input-wrapper">
                <div className="mmbtn-parent">
                    <ClientDropdown
                        label={"Pit depth"}
                        options={pitDepth}
                        onValueChange={handlePitValueChange}
                    />
                    <span className="mmBtn mm-btn-possition">mm</span>
                </div>
                <div>
                    <ClientDropdown
                        label={"Type"}
                        options={typeOptions}
                        onValueChange={handleType}
                    />
                </div>
                <div>
                    <ClientDropdown
                        label={"Purpose"}
                        options={purpose}
                        onValueChange={handlePurpose}
                    />
                </div>
                <div className="capacity-container">
                    <div>
                        <AnimatedInput label={"Capacity"} name={"courseName"} />
                    </div>
                    <div>
                        <div className="selector-container">
                            <span
                                className={`selector-child ${capacity === "kg" ? "selector-child-active" : ""
                                    }`}
                                onClick={() => handleCapacityUnitChange("kg")}
                            >
                                Kg
                            </span>
                            <span
                                className={`selector-child ${capacity === "Pr" ? "selector-child-active" : ""
                                    }`}
                                onClick={() => handleCapacityUnitChange("Pr")}
                            >
                                Pr
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <AnimatedInput
                        label={"Stops"}
                        name={"courseName"}
                        onValueChange={handleInputValueChange}
                    />
                </div>
                <div className="b2b1-container">
                    <div>
                        <div className="btn-container">
                            <span
                                className={`b2-btn ${basementSelection.b2 === "B2" ? "btn-active" : ""
                                    }`}
                                onClick={() => handleChangeInB2("")}
                            >
                                B2
                            </span>
                            <span
                                className={`b1-btn ${basementSelection.b1 === "B1" ? "btn-active" : ""
                                    }`}
                                onClick={() => handleChangeInB1("")}
                            >
                                B1
                            </span>
                        </div>
                    </div>
                    <div className="selector-container">
                        <span
                            className={`selector-child ${data === "G" ? "selector-child-active" : ""
                                }`}
                            onClick={() => handleChange("G")}
                        >
                            G
                        </span>
                        <span
                            className={`selector-child ${data === "S" ? "selector-child-active" : ""
                                }`}
                            onClick={() => handleChange("S")}
                        >
                            S
                        </span>
                    </div>
                    <div></div>
                </div>
                <div>
                    <ClientDropdown
                        label={"Door Type"}
                        options={doorType}
                        onValueChange={handleDoorType}
                    />
                </div>
                <div>
                    <ClientDropdown
                        label={"Construction Material"}
                        options={constructionMaterial}
                        onValueChange={handleContructionMaterial}
                    />
                </div>
                <div>
                    <ClientDropdown
                        label={"Number of opening"}
                        options={numberOfOpenings}
                        onValueChange={handleNumberOfOpenings}
                    />
                </div>
                <div>
                    <div
                        className={
                            isDivDisabled()
                                ? "degree-container disabled"
                                : "degree-container"
                        }
                    >
                        <>
                            <span
                                className={`degree-container-children ${degree.nintyDegreeLeft === "90dL" ? "degree-selector" : ""
                                    }`}
                                onClick={() => handleDegreeSelection("90dL")}
                            >
                                90°left
                            </span>
                            <span
                                className={`degree-container-children ${degree.nintyDegreeRight === "90dR" ? "degree-selector" : ""
                                    }`}
                                onClick={() => handleDegreeSelection("90dR")}
                            >
                                90°right
                            </span>
                            <span
                                className={`degree-container-children ${degree.oneEightyDegree === "180d" ? "degree-selector" : ""
                                    }`}
                                onClick={() => handleDegreeSelection("180d")}
                            >
                                180°degree
                            </span>
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ElevatorDetails