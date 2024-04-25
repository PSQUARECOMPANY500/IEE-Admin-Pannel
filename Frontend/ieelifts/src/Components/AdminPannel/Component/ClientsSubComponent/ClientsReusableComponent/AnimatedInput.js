import React from "react";

const Animated = ({
  type = "text",
  defaultValue = "",
  name,
  label,
  value,
  onChange,
  read = false,
  handleCalendarOpen,
  email,
  disabled,
  title,
  pattern,
}) => {
  const handleCalendarToggle = () => {

    if (handleCalendarOpen) {
      handleCalendarOpen();
    }
  };

  return (
    <div className="input-container">
      <input
        className="input-field"
        type={type}
        name={name}
        id={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        readOnly={read}
        onClick={handleCalendarToggle}
      />
      <label
        htmlFor={name}
        className="input-label"
        style={{
          top: email && "-20px",
          color: email && "#330152",
          fontWeigh: email && "500",
          fontSize: email && "1rem",
          zIndex:'99999'
        }}
      >
        <sub>{label}</sub>
      </label>
      <span className="input-highlight" ></span>
    </div>
  );
};

export default Animated;