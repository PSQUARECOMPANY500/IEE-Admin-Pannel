

import React from 'react'
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import ClientDropdown from "./ClientsReusableComponent/ClientDropdown";

const ElevatorDetails = ({ pitDepth, typeOptions, purpose, capacity, capacityUnit, handleInputValueChange, basementSelection, doorType, constructionMaterial, numberOfOpenings, degree, openings, handleElevatorDetailsChange, groundOrStilt, handleDegreeSelection }) => {

    return (
        <>
            <div className="client-elevator-input-wrapper">
                <div className="mmbtn-parent">
                    <ClientDropdown
                        label={"Pit depth"}
                        options={pitDepth}
                        onValueChange={() => handleElevatorDetailsChange("pit")}
                    />
                    <span className="mmBtn mm-btn-possition">mm</span>
                </div>
                <div>
                    <ClientDropdown
                        label={"Type"}
                        options={typeOptions}
                        onValueChange={() => handleElevatorDetailsChange("type")}
                    />
                </div>
                <div>
                    <ClientDropdown
                        label={"Purpose"}
                        options={purpose}
                        onValueChange={() => handleElevatorDetailsChange("purpose")}
                    />
                </div>
                <div className="capacity-container">
                    <div>
                        <AnimatedInput label={"Capacity"} name={"courseName"} onValueChange={() => handleInputValueChange("capacity")} />
                    </div>
                    <div>
                        <div className="selector-container">
                            <span
                                className={`selector-child ${capacityUnit === "kg" ? "selector-child-active" : ""
                                    }`}
                                onClick={() => handleElevatorDetailsChange("capacityUnit", "kg")}
                            >
                                Kg
                            </span>
                            <span
                                className={`selector-child ${capacityUnit === "Pr" ? "selector-child-active" : ""
                                    }`}
                                onClick={() => handleElevatorDetailsChange("capacityUnit", "Pr")}
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
                                className={`b2-btn ${basementSelection.b2 ? "btn-active" : ""
                                    }`}
                                onClick={() => handleElevatorDetailsChange("basementSelection", { b1: !basementSelection.b2, b2: !basementSelection.b2 })}
                            >
                                B2
                            </span>
                            <span
                                className={`b1-btn ${basementSelection.b1 ? "btn-active" : ""
                                    }`}
                                onClick={() => handleElevatorDetailsChange("basementSelection", { b1: !basementSelection.b1, b2: false })}
                            >
                                B1
                            </span>
                        </div>
                    </div>
                    <div className="selector-container">
                        <span
                            className={`selector-child ${groundOrStilt === "G" ? "selector-child-active" : ""
                                }`}
                            onClick={() => handleElevatorDetailsChange("groundOrStilt", "G")}
                        >
                            G
                        </span>
                        <span
                            className={`selector-child ${groundOrStilt === "S" ? "selector-child-active" : ""
                                }`}
                            onClick={() => handleElevatorDetailsChange("groundOrStilt", "S")}
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
                        onValueChange={handleInputValueChange}
                    />
                </div>
                <div>
                    <ClientDropdown
                        label={"Construction Material"}
                        options={constructionMaterial}
                        onValueChange={handleInputValueChange}
                    />
                </div>
                <div>
                    <ClientDropdown
                        label={"Number of opening"}
                        options={numberOfOpenings}
                        onValueChange={handleInputValueChange}
                    />
                </div>
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
                                className={`degree-container-children ${degree.nintyDegreeLeft ? "degree-selector" : ""
                                    }`}
                                onClick={() => handleDegreeSelection("90dL")}
                            >
                                90°left
                            </span>
                            <span
                                className={`degree-container-children ${degree.nintyDegreeRight ? "degree-selector" : ""
                                    }`}
                                onClick={() => handleDegreeSelection("90dR")}
                            >
                                90°right
                            </span>
                            <span
                                className={`degree-container-children ${degree.oneEightyDegree ? "degree-selector" : ""
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