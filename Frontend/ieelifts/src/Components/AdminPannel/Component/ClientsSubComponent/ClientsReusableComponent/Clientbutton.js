import React from 'react';

const Clientbutton = ({ value, className }) => {
  let buttonClassName = 'client-form-button';

  if (value === "Delete") {
    buttonClassName += ' ' + className; 
  }else if(value==='Next'){
    buttonClassName+= ' '+ className;
  }

  return (
    <>
      <button className={buttonClassName}>{value}</button>
    </>
  );
};

export default Clientbutton;
