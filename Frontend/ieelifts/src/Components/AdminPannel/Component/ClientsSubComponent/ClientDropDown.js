import { RiArrowDropDownLine } from "react-icons/ri";
import CheckBox from "../DashboardSubComponent/CheckBox";
import { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaApple } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaSms } from "react-icons/fa";




const ClientDropDown = ({ options, selectedOption, checkbox, showOptions, defaultName, pic, color, toggleOptions, handleOptionClick, w, id }) => {
    const hasSpecialOption = selectedOption.includes('Warranty') ||
        selectedOption.includes('Gold') ||
        selectedOption.includes('Platinum') ||
        selectedOption.includes('Silver');

    const [selectedIcon, setSelectedIcon] = useState(null);

    // Function to set the selected icon based on the option
    const setSelectedIconByOption = (option) => {
        switch (option) {
            case 'App':
                setSelectedIcon(<FaApple />);
                break;
            case 'Message':
                setSelectedIcon(<MdMessage />);
                break;
            case 'SMS':
                setSelectedIcon(<FaSms />);
                break;
            case 'WhatsApp':
                setSelectedIcon(<IoLogoWhatsapp />);
                break;
            default:
                setSelectedIcon(null); 
        }
    };


    // Handle option click in first dropdown
    const handleOptionClickAndIcon = (option) => {
        handleOptionClick(option);
        setSelectedIconByOption(option);
    };


    //condition for second dropdown and third dropdown for CSS
    const dropdownClass = id === 1 ? 'second-dropdown' : (id === 2 ? 'third-dropdown' : '');

    const [textColor, setTextColor] = useState("");

    const handleTextColor = (option) => {
        switch (option) {
            case 'Warranty':
                setTextColor('#0F351D');
                break;
            case 'Gold':
                setTextColor('#F8AC1D');
                break;
            case 'Platinum':
                setTextColor('#FF7F00');
                break;
            case 'Silver':
                setTextColor('#8E8E8E');
                break;
            default:
                setTextColor("#F8AC1D"); // Default color
        }
    };

    return (
        <div className={`client-modal-dropdown ${dropdownClass}`} onClick={toggleOptions} style={{ width: w }}>
            {/* -------------------------------------Raj----------------------------------------- */}

            <div className='dropdown-icon-container'>
                <div className="dropdown-icon-container-img">
                    {selectedIcon || <img src={pic} />}
                </div>
                <h6>
                    {defaultName}
                </h6>
                <p style={{ color: textColor }}>{hasSpecialOption ? <span className="green-padding" style={{ backgroundColor: getBackgroundColor(selectedOption) }}>{selectedOption}</span> : selectedOption}</p>

                <RiArrowDropDownLine style={{ color: "#8E8E8E" }} className='icon-size' />
            </div>
            {showOptions && (
                <div className='client-modal-drodown-options'>

                    {options.map((option, index) => (
                        <div key={index}
                            onClick={() => {
                                handleOptionClick(option);
                                handleTextColor(option);
                                handleOptionClickAndIcon(option);
                            }}
                            className='client-modal-dropdown-option'>
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
            return '#D6F8BF';
        case 'Gold':
            return '#FEE2AE';
        case 'Platinum':
            return '#F3DCC6';
        case 'Silver':
            return '#E5E5E5';
        default:
            return '';
    }
};

export default ClientDropDown;
