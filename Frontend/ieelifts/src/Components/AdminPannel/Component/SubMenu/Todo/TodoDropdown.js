import React,{useState} from 'react'

export const TodoDropdown = ({options,name,label, onValueChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const handleIconClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleDataClick = (data) => {
    onValueChange(name,data)
    setSelectedData(data);
    setIsOpen(false);
  };
  return (
    <div className='todo-dropdown'>
        <input placeholder={label} className='todo-dropdown-input' name={name} value={selectedData} readOnly   onClick={handleIconClick}/>
        <span className='todo-dropdown-icon-container'>
          <img src='./dropdownicon.png' alt='dropdown icon'  onClick={handleIconClick}/>
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
