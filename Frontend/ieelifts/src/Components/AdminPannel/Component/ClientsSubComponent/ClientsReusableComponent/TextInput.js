import React, { useEffect, useState } from 'react';

const TextInput = ({
  type,
  name,
  label,
  w = 'auto',
  value,
  onChange,
  read = false,
  handleCalendarOpen,
  click,
  onBlur,
  onFocus,
  id,
  emailError,
  
 
}) => {

  const [numberError, setNumberError] = useState(true)
    useEffect(()=>{
      if(name==="phoneNumber" || name==="alternativeNumber" || name==="contractorNumber" || name==="architectNumber" ){
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
          setNumberError(true);
        } else{
          setNumberError(false)
        }
    }
    },[value])
    if(name==="phoneNumber"){
      console.log(numberError)
    }
    let condition = name==="phoneNumber" || name==="alternativeNumber" || name==="contractorNumber" || name==="architectNumber" ;
   
  return (
    <div className="input-container" style={{ width: `${w}`,}} >
      <input
        className={`input-field }`}

        type={type ||"text"}
        name={name}
        id={id}
        autoComplete={id}
        onChange={onChange}
        readOnly={read}
        value={value}
        style={{ opacity:'0' }}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={handleCalendarOpen}  
      />
      <label htmlFor={id} className={'input-label'}
        style={{
          top:  click ? "-20px":'0px',
          color:  click ? "#1D1D1D":'#1D1D1D',
          fontWeight:  click?"500":'300',
          fontSize:click ?"1rem":'1rem',
          zIndex: '99999',  
        }}

      >
        <sub>{label}</sub>
      </label>
      <span className="input-highlight" style={{width:click?'100%':'0%'}}></span>
      <span className='input-exist'></span>
      <p style={{ fontSize:'0.9rem',position:'absolute',left:click&&'0%',right:!click&&'0%',top:'0.6rem', color:"#1D1D1D", fontFamily:"Poppins" ,color: type === 'email' && emailError ? 'red' : type==="number" && numberError && condition?'red':'#1D1D1D'}}>{value}</p>
    </div>
  );
};

export default TextInput