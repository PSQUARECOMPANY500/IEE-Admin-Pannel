import React, { useEffect, useState } from 'react';
const ClientDateInput = ({onCalendarToggle,dateOfHandover }) => {
  const [inputValue, setInputValue] = useState('');
  console.log("inputValue",inputValue)
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
//    console.log("date of handover",dateOfHandover)
useEffect(()=>{
    setInputValue(dateOfHandover)
},[dateOfHandover])
  return (
    <div className="clientDateContainer">
      <span className="labelContainer">
        <label
          htmlFor="clientDateInput"
          className={`inputLabel ${inputValue ? 'hidden' : ''}`}
        >
          Date of handover
        </label>
      </span>
      <span className="iconContainer" >
        <img
          src="calendarIcon.png"
          alt="calendarIcon"
          className="calendarIcon"
          onClick={onCalendarToggle}
        />
      </span>
      <input
        type="text"
        id="clientDateInput"
        className="clientDateInput"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ClientDateInput;
