import React from 'react'
import { HiOutlineChevronUpDown } from "react-icons/hi2";

const AssignDropdown = (props) => {
  return (
    <div className={`status-section-button ${props.customAssign} ${props.customAssignName} ${props.customResolved }`}>
      <p>{props.name}</p>
      <HiOutlineChevronUpDown />
    </div>
  )
}

export default AssignDropdown
