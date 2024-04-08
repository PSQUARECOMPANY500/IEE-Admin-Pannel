import { RiArrowDropDownLine } from "react-icons/ri";

const ClientDropDown = ({ options, selectedOption, showOptions, toggleOptions, handleOptionClick,w }) => {
    return (
        <div className='client-modal-dropdown' onClick={toggleOptions} style={{width:w}}>
            <div className='dropdown-icon-container'>
                <p>{selectedOption}</p>
                <RiArrowDropDownLine  className='icon-size' />
            </div>
            {showOptions && (
                <div className='client-modal-drodown-options'>
                    {options.map((option, index) => (
                        <div key={index} onClick={() => handleOptionClick(option)} className='client-modal-dropdown-option'>
                            <p>{option}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClientDropDown;
