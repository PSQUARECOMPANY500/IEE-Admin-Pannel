// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React from 'react';

const Clientbutton = ({ value, className, handleNextPage }) => {
  let buttonClassName = 'client-form-button';

  if (value === "Delete") {
    buttonClassName += ' ' + className; 
  }else if(value==='Next'){
    buttonClassName+= ' '+ className;
  }

  return (
    <>
      <button className={buttonClassName} onClick={handleNextPage}>{value}</button>
    </>
  );
};

export default Clientbutton;
