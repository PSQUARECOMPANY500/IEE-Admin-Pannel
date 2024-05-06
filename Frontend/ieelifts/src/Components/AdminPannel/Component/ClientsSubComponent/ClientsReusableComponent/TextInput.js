import React, { useEffect } from 'react';

const TextInput = ({
  type = 'text',
  name,
  label,
  w = '20rem',
  value,
  onChange,
  read = false,
  handleCalendarOpen,
  click,
  onBlur,
  onFocus

}) => {
  const handleCalendarToggle = (e) => {
    if (handleCalendarOpen) {
      handleCalendarOpen();
    }
  };

  



  return (
    <div className="input-container" style={{ width: `${w}`,marginTop:'20px'}} >
      <input
        className="input-field"
        type={type}
        name={name}
        id={name}
        autoComplete={name}
        onChange={onChange}
        readOnly={read}
        value={value}
        style={{ opacity:'0' }}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={handleCalendarOpen}
      
      />
    
      <label htmlFor={name} className={'input-label'}
        style={{
          top:  click ? "-20px":'0px',
          color:  click ? "#1D1D1D":'#1D1D1D',
          fontWeigh:  click?"500":'300',
          fontSize:click ?"1rem":'1rem',
          zIndex: '99999'
        }}

      >
        <sub>{label}</sub>
      </label>
      <span className="input-highlight" style={{width:click?'100%':'0%'}}></span>
      <span className='input-exist'></span>
      <p style={{ fontSize:'1rem',position:'absolute',left:click&&'0%',right:!click&&'0%',top:'0.6rem'}}>{value}</p>
    </div>
  );
};

export default TextInput