import React from 'react'

const CheckBox = ({ id, checked, handleCheckboxChange }) => {
    // console.log({id:id,checked:checked,handleCheckboxChange:handleCheckboxChange})
  return (
    <div class="checkboxes__row">
    <div class="checkboxes__item">
      <label class="checkbox style-c">
        <input
         type="checkbox"
         id={id}
        checked={checked}
        onChange={handleCheckboxChange}
        />
        <div class="checkbox__checkmark"></div>
        <div class="checkbox__body"></div>
      </label>
    </div>
    </div>
  )
}

export default CheckBox
