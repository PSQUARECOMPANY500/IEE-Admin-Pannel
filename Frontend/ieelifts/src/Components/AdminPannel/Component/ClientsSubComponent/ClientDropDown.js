import { RiArrowDropDownLine } from "react-icons/ri";

const ClientDropDown = ({ options, selectedOption, showOptions, defaultName, pic,color, toggleOptions, handleOptionClick, w }) => {
    const hasWarranty = selectedOption.toLowerCase().includes('warranty'); // Check if 'warranty' is in selectedOption

    return (
        <div className='client-modal-dropdown' onClick={toggleOptions} style={{ width: w }}>

            <div className='dropdown-icon-container'>
                <div>
                    <img src={pic} />
                </div>
                <h6>
                    {defaultName}
                </h6>
                <p style={{ color: color }}>{hasWarranty ? <span className="green-padding">{selectedOption}</span> : selectedOption}</p>
                <RiArrowDropDownLine style={{ color: color }} className='icon-size' />
            </div>
            {showOptions && (
                <div  className='client-modal-drodown-options'>

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
