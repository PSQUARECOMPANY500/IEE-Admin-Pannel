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
      backgroundColor: "white",
      boxShadow: state.isFocused ? "none" : "rgba(99, 99, 99, 0.2) 0px 0 2px 1px",
      border: state.isFocused ? "1px solid #F8AC1D80" : "none",
      borderRadius: "5px",
      fontSize: "0.8rem",
      height: 'auto',
      padding: '0',
      display: "flex",
      alignItems: "center",
      ":hover": {
        boxShadow: "0px 0px 5px #F8AC1D80",
        border: "none",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "0.8rem",
      fontFamily: 'Poppins',
      opacity: '0.6',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      padding: "0",
      fontSize: '0.8rem',
      maxHeight: '200px',
      overflowY: 'auto',
      marginTop: '0.5rem',
      "::-webkit-scrollbar": {
        width: '3px',
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: '#F8AC1D',
      },
      
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '0',
      margin: '0',
      maxHeight: '200px',
      overflowY: 'auto',
      "::-webkit-scrollbar": {
        width: '3px',
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: '#F8AC1D',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#F8AC1D" : "#FFFFFF",
      color: state.isSelected ? "white" : "black",
      marginTop: '4px',
      fontSize: "0.8rem",
      padding: '8px 10px',
      ":hover": {
        backgroundColor: "#FEF3DE",
        color: "#F8AC1D",
        borderRadius: "5px",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#FEF3DE",
      borderRadius: "15px",
      fontSize: "0.8rem",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#F8AC1D",
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: state.isHovered ? "white" : "#F8AC1D",
      backgroundColor: state.isHovered ? "#F8AC1D" : "transparent",
      ":hover": {
        backgroundColor: "#FEF3DE",
        color: "#F8AC1D",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: 'auto',
    }),
  };

  const handleChange = (selectedOption) => {
    console.log("dropdown information : ", selectedOption);
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
