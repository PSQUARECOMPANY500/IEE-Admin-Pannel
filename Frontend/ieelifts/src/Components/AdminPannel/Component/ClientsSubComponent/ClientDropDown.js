
import { RiArrowDropDownLine } from "react-icons/ri";
import CheckBox from "../DashboardSubComponent/CheckBox";
import React, { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaApple } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaSms } from "react-icons/fa";
{/* -------------------------------------Raj----------------------------------------- */ }
const ClientDropDown = ({ options, selectedOption, checkbox, showOptions, defaultName, pic, color, toggleOptions, handleOptionClick, w, id }) => {
    const hasSpecialOption = selectedOption.includes('Warranty') ||
        selectedOption.includes('Gold') ||
        selectedOption.includes('Platinum') ||
        selectedOption.includes('Silver');

    const [selectedIcon, setSelectedIcon] = useState([]);

        const setSelectedIconByOption = (option) => {
            let newIcon;
            switch (option) {
                case 'App':
                    newIcon = <FaApple />;
                    break;
                case 'Message':
                    newIcon = <MdMessage />;
                    break;
                case 'SMS':
                    newIcon = <FaSms />;
                    break;
                case 'WhatsApp':
                    newIcon = <IoLogoWhatsapp />;
                    break;
                default:
                    newIcon = null;
            }
        
            if (selectedIcon.some(icon => icon.type === newIcon.type)) {
                setSelectedIcon(prevIcons => prevIcons.filter(icon => icon.type !== newIcon.type));
            } else {
                setSelectedIcon(prevIcons => [...prevIcons, newIcon]);
            }
        };
        

    // Handle option click in first dropdown
    const handleOptionClickAndIcon = (option) => {
        handleOptionClick(option);
        setSelectedIconByOption(option);
    };


    const handleOptionClickWithStyle = (event, option) => {
        handleOptionClick(option);
        handleTextColor(option);
        const options = document.querySelectorAll('.client-modal-drodown-options p');
        options.forEach(option => option.classList.remove('selected'));
        event.target.classList.add('selected');
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
                setTextColor("#F8AC1D");
        }
    };

    return (
        <div className={`client-modal-dropdown ${dropdownClass}`} onClick={toggleOptions} style={{ width: w }}>

            <div className='dropdown-icon-container'>
                <div className="dropdown-icon-container-img">
                    {selectedIcon}
                </div>
                <h6>
                    {defaultName}
                </h6>
                <p style={{ color: textColor }}>
                    {hasSpecialOption ? (
                        <span className="green-padding" style={{ backgroundColor: getBackgroundColor(selectedOption) }}>
                            {selectedOption}
                        </span>
                    ) : (
                        selectedIcon.length >= 2 ? "" : selectedOption
                    )}
                </p>

                <RiArrowDropDownLine style={{ color: "#8E8E8E" }} className='icon-size' />
            </div>
            {showOptions && (
                <div className='client-modal-drodown-options'>

                    {options.map((option, index) => (
                        <div key={index}
                            onClick={(event) => {
                                handleOptionClick(option);
                                handleTextColor(option);
                                handleOptionClickAndIcon(option)
                                handleOptionClickWithStyle(event, option);
                            }}
                            className={`client-modal-dropdown-option ${selectedOption === option ? 'selected' : ''}`}>
                            {id === 0 && <></>}
                            <p>{option}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};



// This is only for second dropdown background-color
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

export default React.memo(ClientDropDown);
