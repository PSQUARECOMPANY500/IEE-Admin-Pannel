// <-----------------------------  Author:- Rahul Kumar --------------30/4/24--------------------->
import React, { useState } from 'react';

const ClientDropdown = ({ options, name, label, onValueChange,  w , }) => {
  //useState hooks
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState('');

  const opt = options; //options for dropdown
  function toCamelCase(str) {
    // Check if the string is empty or null
    if (!str) return str;

    // Split the string into words
    let words = str.split(/\s+/);

    // Capitalize the first letter of each word except the first one and concatenate them
    let camelCaseStr = words.map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)).join('');

    return camelCaseStr;
  }

  const handleDataClick = (data) => {
    setSelectedData(data);
    let field = toCamelCase(label)
    onValueChange(field, data)
    setIsOpen(false);
  };

  const handleIconClick = () => {
    setIsOpen(prevState => !prevState);
  }
  return (
    <div className='client-dropdown'>
      <input className='dropdown-input' placeholder={label} style={{ width: `${w}`,}} name={name} value={selectedData} readOnly onClick={handleIconClick} /> <span className='dropdown-icon-container'><img src='./dropdownicon.png' alt='dropdown icon' onClick={handleIconClick} /></span>
      {isOpen && (
        <div className='option-container'>
          <ul>
            {opt.map((option, index) => (
              <li className='option-li' key={index} onClick={() => handleDataClick(option)}>{option}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientDropdown;
// <-----------------------------  Author:- Rahul Kumar --------------30/4/24--------------------->