import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const MultiSelectDropdown = () => {
  const colourOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "apple", label: "apple" },
    { value: "straw", label: "straw" },
  ];

  // Custom styles for the dropdown
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "white" : "white",
      boxShadow: state.isFocused
        ? "none"
        : "rgba(99, 99, 99, 0.2) 0px 0 2px 1px",

      border: state.isFocused ? "1px solid #F8AC1D80" : "none",

      borderRadius: "5px",
      fontSize: "17px", // Font size of the control
      ":hover": {
        // border:'1px solid #F8AC1D',
        boxShadow: "0px 0px 5px #F8AC1D80",
        border: "none",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      padding: "8px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#FFFFFF" : "#FFFFFF",
      color: state.isSelected ? "white" : "black",
      fontSize: "14px",
      ":hover": {
        backgroundColor: "#FEF3DE", // Background color of the remove icon on click
        color: "#F8AC1D", // Text color of the remove icon on click
        borderRadius: "5px",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#FEF3DE", // Background color of tags
      borderRadius: "15px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#F8AC1D", // Text color of tags
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: state.isHovered ? "white" : "#F8AC1D", // Text color of the remove icon
      backgroundColor: state.isHovered ? "#F8AC1D" : "transparent", // Background color of the remove icon on hover
      ":hover": {
        backgroundColor: "#FEF3DE", // Background color of the remove icon on click
        color: "#F8AC1D", // Text color of the remove icon on click
      },
    }),
  };

  return (
    <Select
      placeholder="Select Engineers"
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={colourOptions}
      styles={customStyles} // Apply the custom styles
    />
  );
};

export default MultiSelectDropdown;
