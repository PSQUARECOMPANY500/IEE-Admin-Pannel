import { RiDeleteBin6Line } from "react-icons/ri";
import { LuBellRing } from "react-icons/lu";
import { BiEditAlt } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
const BadgeBubble = ({handleDelete,handleUpdateStatus,status}) =>{
    return(
        <div className="badge-popup">
          <div className="badge-icon-container">
         <FaCircleCheck className={`badge-icon ${status==="Completed"?"task-completed":""}`} onClick={handleUpdateStatus}/>
         <BiEditAlt className="badge-icon" />
         <LuBellRing className="badge-icon"/>
         <RiDeleteBin6Line className="badge-deleteIcon" onClick={handleDelete}/>
          </div>
       </div>
    )
}

export default BadgeBubble;