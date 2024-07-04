import React,{useState,useRef,useEffect} from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
export const TodoDropdown = ({options,name,label, onValueChange, errors}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedData, setSelectedData] = useState("");
  const handleIconClick = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handleDataClick = (data) => {
    onValueChange(name,data)
    setSelectedData(data);
    setIsOpen(false);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <div className='todo-dropdown' ref={dropdownRef}>
        <input placeholder={label} className={`todo-dropdown-input ${errors?"validateInput":""}`} name={name} value={selectedData} readOnly   onClick={handleIconClick}/>
        <span className='todo-dropdown-icon-container'>
          <img src='./todo-dropdown-icon.png' alt='dropdown icon' className='todo-dropdown-icon'  onClick={handleIconClick}/>
        </span>
       {
        isOpen && (
          <div className='todo-option-container'>
            <ul>
              {
                options.map((option, i) =>(
                  <li className="option-li" onClick={() => handleDataClick(option)} key={option}>{option}</li>
                ))
              }
            </ul>
        </div>
        )
       }
    </div>
  )
}

export default TodoDropdown;
