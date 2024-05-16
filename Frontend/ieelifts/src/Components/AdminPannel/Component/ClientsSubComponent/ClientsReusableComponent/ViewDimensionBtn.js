import React from 'react'

const ViewDimensionBtn = ({value, className, handleNextPage}) => {
    let buttonClassName = 'view-form-button';

     if (value === "Delete") {
    buttonClassName += ' ' + className; 
  }else if(value==='Next'){
    buttonClassName+= ' '+ className;
  }

  return (
    <div>
      <button className={buttonClassName} onClick={handleNextPage}>{value}</button>

    </div>
  )
}

export default ViewDimensionBtn
