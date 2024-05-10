import { RiArrowDropDownLine } from "react-icons/ri";
import React, { useEffect, useRef, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaApple } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaSms } from "react-icons/fa";
{
  /* -------------------------------------Raj----------------------------------------- */
}
const ClientDropDown = ({
  options,
  selectedOption,
  showOptions,
  defaultName,
  toggleOptions,
  handleOptionClick,
  w,
  id,
}) => {
  const hasSpecialOption =
    selectedOption.includes("Warranty") ||
    selectedOption.includes("Gold") ||
    selectedOption.includes("Platinum") ||
    selectedOption.includes("Silver");

  const [selectedIcon, setSelectedIcon] = useState([]);
//   const cardRef = useRef();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (cardRef.current && !cardRef.current.contains(event.target)) {
//         toggleOptions();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [cardRef, toggleOptions]);

  const setSelectedIconByOption = (option) => {
    let newIcon;
    switch (option) {
      case "Application":
        newIcon = { type: "Application", icon: <FaApple /> };
        break;
      case "Message":
        newIcon = { type: "Message", icon: <MdMessage /> };
        break;
      case "SMS":
        newIcon = { type: "SMS", icon: <FaSms /> };
        break;
      case "WhatsApp":
        newIcon = { type: "WhatsApp", icon: <IoLogoWhatsapp /> };
        break;
      default:
        newIcon = null;
    }

    if (newIcon && selectedIcon.some((icon) => icon.type === newIcon.type)) {
      setSelectedIcon((prevIcons) =>
        prevIcons.filter((icon) => icon.type !== newIcon.type)
      );
    } else if (newIcon) {
      setSelectedIcon((prevIcons) => [...prevIcons, newIcon]);
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
  };

  //condition for second dropdown and third dropdown for CSS
  const dropdownClass =
    id === 1 ? "second-dropdown" : id === 2 ? "third-dropdown" : "";

  const [textColor, setTextColor] = useState("");

  const handleTextColor = (option) => {
    switch (option) {
      case "Warranty":
        setTextColor("Warranty #0F351D");
        break;
      case "Gold":
        setTextColor("Gold #F8AC1D");
        break;
      case "Platinum":
        setTextColor("Platinum #FF7F00");
        break;
      case "Silver":
        setTextColor("Silver #8E8E8E");
        break;
      case "Service History":
        setTextColor("Service History #F8AC1DAD");
        break;
      case "Call Back History":
        setTextColor("Call Back History #F8AC1DAD");
        break;
      case "Document":
        setTextColor("Document #F8AC1DAD");
        break;
      case "SOS Calls":
        setTextColor("SOS Calls #F8AC1DAD");
        break;
      default:
        setTextColor("");
    }
  };
  return (
    <div
      className={`client-modal-dropdown ${dropdownClass}`}
      onClick={toggleOptions}
      style={{ width: w }}
    >
      <div className="dropdown-icon-container">
        <div className="dropdown-icon-container-img">
          {selectedIcon.map((data) => {
            return data.icon;
          })}
        </div>
        <h6>{defaultName}</h6>
        <p
          style={{
            color: textColor.split(" ").slice(-1)[0],
          }}
        >
          {hasSpecialOption ? (
            <span
              className="green-padding"
              style={{ backgroundColor: getBackgroundColor(selectedOption), marginLeft:"5px" }}
            >
              {id === 0
                ? selectedIcon.forEach((data) => {
                    return data.type;
                  })
                : selectedOption}
            </span>
          ) : selectedIcon.length >= 2 ? (
            ""
          ) : id === 0 ? (
            selectedIcon.length > 0 ? (
              selectedIcon.map((data) => data.type)
            ) : (
              "Message"
            )
          ) : (
            selectedOption
          )}
        </p>
        {dropdownClass === "second-dropdown" ? (
          <RiArrowDropDownLine
            style={{ color: "#8E8E8E", left: "87%" }}
            className="icon-size"
          />
        ) : (
          <RiArrowDropDownLine
            style={{ color: "#8E8E8E", left: "78%" }}
            className="icon-size"
          />
        )}{" "}
      </div>
      {showOptions && (
        <div className="client-modal-drodown-options">
          {options.map((option, index) => {
            return (
              <div
                key={index}
                onClick={(event) => {
                  handleOptionClick(option);
                  handleTextColor(option);
                  handleOptionClickAndIcon(option);
                }}
                className={`client-modal-dropdown-option `}
              >
                {id === 0 && <></>}
                <p
                  style={{
                    color:
                      selectedIcon.some((icon) =>
                        String(icon.type)
                          .toLowerCase()
                          .includes(option.toLowerCase())
                      ) || textColor.split(" ")[0] === option.split(" ")[0]
                        ? "#F8AC1DAD"
                        : "inherit",
                  }}
                >
                  {option}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const getBackgroundColor = (selectedOption) => {
  switch (selectedOption) {
    case "Warranty":
      return "#D6F8BF";
    case "Gold":
      return "#FEE2AE";
    case "Platinum":
      return "#F3DCC6";
    case "Silver":
      return "#E5E5E5";
    default:
      return "";
  }
};

export default React.memo(ClientDropDown);
