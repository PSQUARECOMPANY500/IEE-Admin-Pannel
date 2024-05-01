import { RiArrowDropDownLine } from "react-icons/ri";
import CheckBox from "../DashboardSubComponent/CheckBox";

const ClientDropDown = ({ options, selectedOption, checkbox, showOptions, defaultName, pic, color, toggleOptions, handleOptionClick, w, id }) => {
    const hasSpecialOption = selectedOption.includes('Warranty') ||
        selectedOption.includes('Gold') ||
        selectedOption.includes('Platinum') ||
        selectedOption.includes('Silver');

    //condition for second dropdown
    const dropdownClass = id === 1 ? 'second-dropdown' : '';


    return (
        <div className={`client-modal-dropdown ${dropdownClass}`} onClick={toggleOptions} style={{ width: w }}>
            {/* -------------------------------------Raj----------------------------------------- */}

            <div className='dropdown-icon-container'>
                <div>
                    <img src={pic} />
                </div>
                <h6>
                    {defaultName}
                </h6>
                <p style={{ color: color }}>{hasSpecialOption ? <span className="green-padding" style={{ backgroundColor: getBackgroundColor(selectedOption) }}>{selectedOption}</span> : selectedOption}</p>

                <RiArrowDropDownLine style={{ color: color }} className='icon-size' />
            </div>
            {showOptions && (
                <div className='client-modal-drodown-options'>

                    {options.map((option, index) => (
                        <div key={index} onClick={() => handleOptionClick(option)} className='client-modal-dropdown-option'>
                            {id === 0 && <CheckBox />}
                            <p>{option}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const getBackgroundColor = (selectedOption) => {
    switch (selectedOption) {
        case 'Warranty':
            return '#0F351D';
        case 'Gold':
            return '#F8AC1D';
        case 'Platinum':
            return '#FF7F00';
        case 'Silver':
            return '#B7B7B7';
        default:
            return '';
    }
};

export default ClientDropDown;
