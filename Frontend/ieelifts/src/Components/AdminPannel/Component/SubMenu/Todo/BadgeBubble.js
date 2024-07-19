import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuBellRing } from "react-icons/lu";
import { BiEditAlt } from "react-icons/bi";
import { FaCircleCheck, FaS } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { updateTodoData } from "../../../../../ReduxSetup/Actions/AdminActions";


const BadgeBubble = ({handleDelete,handleUpdateStatus,status,handleOpenAddClick, id}) => {
    const dispatch = useDispatch();
    const handleUpdate = () => {
        const flag = true; 
        dispatch(updateTodoData(id, flag));
        handleOpenAddClick();
      };
  return (
    <div className="badge-popup">
    <div className="badge-icon-container">
   <FaCircleCheck className={`badge-icon ${status==="Completed"?"task-completed":""}`} onClick={handleUpdateStatus}/>
   <BiEditAlt className="badge-icon" onClick={handleUpdate} />
   <LuBellRing className="badge-icon"/>
   <RiDeleteBin6Line className="badge-deleteIcon" onClick={handleDelete}/>
    </div>
 </div>
)
}

export default BadgeBubble;