import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const SingleSetDropdown = ({ width, padding }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selected) => {
    console.log("Selected abhinav :", selected);
    setSelectedOption(selected);
  };



  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "white" : "white",
      boxShadow: state.isFocused
        ? "none"
        : "rgba(99, 99, 99, 0.2) 0px 0 2px 1px",
      border: state.isFocused ? "1px solid #F8AC1D80" : "none",
      borderRadius: "5px",
      fontSize: "17px",
      width: width,
      ":hover": {
        boxShadow: "0px 0px 5px #F8AC1D80",
        border: "none",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      padding: "8px",
      width: width,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#FEF3DE" : "#ffffff",
      color: state.isSelected ? "#F8AC1D" : "black",
      fontSize: "14px",
      padding: padding,
      ":hover": {
        backgroundColor: "#FEF3DE",
        color: "#F8AC1D",
        borderRadius: "5px",
      },
    }),
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      value={selectedOption}
      onChange={handleChange}
    />
  );
};

export default SingleSetDropdown;
