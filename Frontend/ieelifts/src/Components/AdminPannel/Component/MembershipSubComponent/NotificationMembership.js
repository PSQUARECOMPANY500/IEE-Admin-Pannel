import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi";


const NotificationMembership = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [options] = useState(["Option 1", "Option 2", "Option 3"]);
  const [showOptions, setShowOptions] = useState(false); // Initialize as false
  const dropdownRef = useRef(null);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleClickOutside = (event) => {
    console.log('Clicked outside');
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      console.log('Closing dropdown');
      setShowOptions(false);
    }
  };


  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <div className="NotificationContainer" >
      <div ref={dropdownRef}>
        <input
          className="inputNotification"
          placeholder="Notification"
          value={selectedOption}
          onChange={handleSelectChange}
        />
        <div onClick={toggleOptions}>
          <FaChevronDown className="chevronDownMembership" />
        </div>
      </div>
      <div className="sendButton">
        <BiSolidSend />
      </div>
      <div className="notificationOptions">
        {showOptions && (
          <div className="options">
            {options.map((option, index) => (
              <div
                key={index}
                className="option"
                onClick={() => handleSelectChange({ target: { value: option } })}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div >
  );
};

export default NotificationMembership;
