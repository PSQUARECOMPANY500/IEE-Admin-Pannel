// import React, { useState, useRef, useEffect } from "react";
// import { FaChevronDown } from "react-icons/fa";

// const NotificationMembership = () => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [options] = useState(["Option 1", "Option 2", "Option 3"]);
//   const [showOptions, setShowOptions] = useState(false);
//   const dropdownRef = useRef(null);

//   const handleSelectChange = (event) => {
//     setSelectedOption(event.target.value);
//     setShowOptions(false);
//   };

//   const toggleOptions = () => {
//     setShowOptions(!showOptions);
//   };
//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setShowOptions(false);
//     }
//   };
//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div style={{ position: "relative" }}>
//       <input
//         className="inputNotification"
//         placeholder="Notification"
//         value={selectedOption}
//         onChange={handleSelectChange}
//         // Clicking on the input also toggles the options
//       />
//       <FaChevronDown
//         style={{
//           position: "absolute",
//           top: "68%",
//           left: "10rem",
//           transform: "translateY(-50%)",
//           cursor: "pointer",
//         }}
//         onClick={toggleOptions}
//       />
//       {showOptions && (
//         <div
//           ref={dropdownRef}
//           style={{
//             position: "absolute",
//             top: "100%",
//             left: 0,
//             width: "100%",
//             zIndex: 999,
//             backgroundColor: "#fff",
//             border: "1px solid #ccc",
//             boxShadow: "0 2px 4px rgba(0,0,0,.1)",
//           }}
//         >
//           {options.map((option, index) => (
//             <div
//               key={index}
//               style={{ padding: "5px", cursor: "pointer" }}
//               onClick={() => handleSelectChange({ target: { value: option } })}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationMembership;

import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const NotificationMembership = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [options] = useState(["Option 1", "Option 2", "Option 3"]);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <input
        className="inputNotification"
        placeholder="Notification"
        value={selectedOption}
        onChange={handleSelectChange}
        // Clicking on the input also toggles the options
      />
      <FaChevronDown
        style={{
          position: "absolute",
          top: "50%",
          right: "0.5rem",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
        onClick={toggleOptions}
      />
      {showOptions && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "calc(100% - 1rem)",
            zIndex: 999,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0,0,0,.1)",
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              style={{ padding: "5px", cursor: "pointer" }}
              onClick={() => handleSelectChange({ target: { value: option } })}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationMembership;
