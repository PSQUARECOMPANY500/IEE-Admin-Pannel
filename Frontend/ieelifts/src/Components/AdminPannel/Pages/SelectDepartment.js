import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import enggIcon from "../../../Assets/Images/admin@2x.png";
import tick from "../../../Assets/Images/tick.svg";
import crm from "../../../Assets/Images/customer-relationship-management@2x.png";

const SelectDepartment = ({getName}) => {
  const [departmentValue, setDepartmentValue] = useState("");
  const [isSelection, setIsSelection] = useState(false);
  const naviagate = useNavigate();
  const departments = [
    {
      id: 1,
      name: "Service Admin",
      value: "ServiceAdmin",
      image: enggIcon,
      heading: "Service Administrator",
    },
    {
      id: 2,
      name: "CRM Admin",
      value: "CRM",
      image: crm,
      heading: "CRM Administrator"
    },
    {
      id: 3,
      name: "Erection Admin",
      value: "ErectionAdmin",
      image: crm,
      heading: "Erection Administrator"
    },
  ];

  const handleDepartmentName = () => {
    naviagate('/login', {
      state: { value: departmentValue },
    })
  };
  const handleToGetName = (value,heading, index) => {
    setDepartmentValue(value);
    setIsSelection(index);
    getName(heading);
  };

  return (
    <>
      <div className="department-main-div">
        {departments.map((department, index) => {
          return (
            <div
              className={`department-name-div ${isSelection === index ? "selected-border" : ""
                }`}
              onClick={() => handleToGetName(department.value,department.heading, index)}
            >
              <div className="department-icon">
                <img
                  src={department.image}
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div className="department-tag">{department.name}</div>
              {isSelection === index && (
                <img src={tick} className="check-tick" />
              )}
            </div>
          );
        })}
      </div>

      <button
        style={{ opacity: departmentValue ? "1" : "0.5" }}
        disabled={departmentValue ? false : true}
        className="Proceed-button"
        onClick={handleDepartmentName}
      >
        Proceed
      </button>
    </>
  );
};

export default SelectDepartment;