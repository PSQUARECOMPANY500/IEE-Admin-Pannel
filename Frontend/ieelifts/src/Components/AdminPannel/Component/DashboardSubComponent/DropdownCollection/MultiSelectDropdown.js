import React, { useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const MultiSelectDropdown = ({
  placeholder,
  Details,
  slots,
  handleEnggSelectionChange,
  isAssigned,
  EnggName,
  editchange,
}) => {
  const [selectedValue, setSelectedValue] = useState([]);

  const enggDetailsData = Details || slots || [];

  const dynamicOptions = enggDetailsData.map((engg) => ({
    value: engg.EnggId || engg.slot,
    label: engg.EnggName || engg.slot,
  }));

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
      fontSize: "0.8rem", // Font size of the control
      // height:'30px',
    
      ":hover": {
        // border:'1px solid #F8AC1D',
        boxShadow: "0px 0px 5px #F8AC1D80",
        border: "none",
       
      },
    }),    placeholder: (provided) => ({
      ...provided,
      fontSize: "0.8rem", // Adjust the font size here
      fontFamily:'Poppins',
      opacity:'0.6',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      padding: "5px",
      fontSize:'0.8rem',
   
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#FFFFFF" : "#FFFFFF",
      color: state.isSelected ? "white" : "black",
      fontSize: "0.8rem",
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

  const handleChange = (selectedOption) => {
    console.log("dropdoen information : ", selectedOption);
    const selectedValues = selectedOption.map((option) => option.value);
    setSelectedValue(selectedOption);
    handleEnggSelectionChange(selectedValues);
  };

  return (
    <Select
    placeholder={placeholder}
    closeMenuOnSelect={false}
    components={animatedComponents}
    isMulti
    options={dynamicOptions}
    styles={customStyles}
    onChange={handleChange}
    value={selectedValue}
    isDisabled={editchange ? false : isAssigned}
    isSearchable={false} 
/>

  );
};

export default MultiSelectDropdown;
