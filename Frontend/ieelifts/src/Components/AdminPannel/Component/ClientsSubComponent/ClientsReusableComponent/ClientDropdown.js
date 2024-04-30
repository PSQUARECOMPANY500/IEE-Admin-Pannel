// <-----------------------------  Author:- Rahul Kumar --------------30/4/24--------------------->
import React, { useState } from 'react';

const ClientDropdown = ({options,name ,label}) => {
    //useState hooks
    const [data,setData] = useState('');
    const [isOpen,setIsOpen]=useState(false);
    const [selectedData, setSelectedData] = useState('');

     options =['option1','option2']; //options for dropdown

    const handleDataClick = (data) => {
        setSelectedData(data);
        setIsOpen(false);
      };
     
    const handleIconClick = () => {
        setIsOpen(prevState => !prevState);
      }
  return (
    <div className='client-dropdown'>
      <input className='dropdown-input' placeholder={label} name={name} value={selectedData}  readOnly  onClick={handleIconClick}/> <span className='dropdown-icon-container'><img src='./dropdownicon.png' alt='dropdown icon' onClick={handleIconClick}/></span>
     { isOpen &&(
        <div className='option-container'>
        <ul>
            {options.map((option, index) => (
              <li className='option-li' key={index} onClick={() => handleDataClick(option)}>{option}</li>
            ))}
        </ul>
     </div>
    ) } 
    </div>
  );
};

export default ClientDropdown;
// <-----------------------------  Author:- Rahul Kumar --------------30/4/24--------------------->