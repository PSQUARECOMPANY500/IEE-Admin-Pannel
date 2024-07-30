import React, { useEffect, useRef, useState } from 'react';
import { IoTimeOutline } from "react-icons/io5";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const TimeComponent = ({ onTimeChange,taskTime,errors }) => {
  const [clickIcon, setClickIcon] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [time, setTime] = useState("");
  const [meridiem, setMeridiem] = useState("AM");
  const timeComponentRef = useRef(null);
  const handleTimeChange = () => {
    const isHour = Number.isNaN(hours);
    const isMinutes = Number.isNaN(minutes);
    let min = minutes === 0 ? "00" : minutes;
    let formattedTime = `${isHour ? 12 : hours}:${isMinutes ? "00" : min} ${meridiem}`;
    setTime(formattedTime);
    onTimeChange(formattedTime);
  };
  const handleHoursChange = (event) => {
    if (event.target.value <= 12) {
      setHours(event.target.value);
    }
  };
  const handleMinutesChange = (event) => {
    if (event.target.value <= 59) {
      setMinutes(parseInt(event.target.value));
    }
  };
  const handleClick = () => {
    setClickIcon(!clickIcon);
  };
  const handleHourUpDown = (value) => {
    if (value === "plus" && hours < 12) {
      setHours(hours + 1);
    } else if (value === "minus" && hours > 1) {
      setHours(hours - 1);
    }
  };
  const handleMinutesUpDown = (value) => {
    if (value === "plus" && minutes < 59) {
      setMinutes(minutes + 1);
    } else if (value === "minus" && minutes > 0) {
      setMinutes(minutes - 1);
    }
  };

  const handleClickOutside = (event) => {
    if (timeComponentRef.current && !timeComponentRef.current.contains(event.target)){
      setClickIcon(false);
    }
  };

  useEffect(() => {
    handleTimeChange();
  }, [minutes, hours, meridiem]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={timeComponentRef}>
      <div className={`time-component-container ${errors ?"validateInput":""}`}>
        <input type='text' className={`time-component-input`} placeholder="00:00" value={taskTime} readOnly onClick={handleClick} autoComplete="off" />
        <label>
          <IoTimeOutline className='time-icon' onClick={handleClick}/>
        </label>
      </div>
      {
        clickIcon && (
          <div className='time-selector'>
            <div className='time-selector-hour'>
              <div className='time-selector-icon-wrapper'>
                <FaChevronUp className='time-selector-icon' onClick={() => { handleHourUpDown("plus") }} />
              </div>
              <div>
                <input type='number' className='time-input' onChange={handleHoursChange} value={hours} autoComplete="off" />
              </div>
              <div>
                <FaChevronDown className='time-selector-icon' onClick={() => { handleHourUpDown("minus") }} />
              </div>
            </div>
            <div className='time-colon'>:</div>
            <div className='time-selector-hour'>
              <div className='time-selector-icon-wrapper'>
                <FaChevronUp className='time-selector-icon' onClick={() => { handleMinutesUpDown("plus") }} />
              </div>
              <div>
                <input type='number' className='time-input' onChange={handleMinutesChange} value={minutes} autoComplete="off" />
              </div>
              <div>
                <FaChevronDown className='time-selector-icon' onClick={() => { handleMinutesUpDown("minus") }} />
              </div>
            </div>
            <div className='meridiem-container '>
              <div className={`time-meridiem ${meridiem === "AM" ? "meridiem-active" : ""}`} onClick={() => { setMeridiem("AM") }}>
                AM
              </div>
              <div className={`time-meridiem ${meridiem === "PM" ? "meridiem-active" : ""}`} onClick={() => { setMeridiem("PM") }}>
                PM
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default TimeComponent;
