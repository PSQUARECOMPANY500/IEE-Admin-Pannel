import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import EnggLocation from '../DashboardSubComponent/EnggLocationSection/EnggLocation'
import Arrow from "../../../../Assets/Images/arrow.png"

const EngeeniersAttendanceCard = ({onClose}) => {

   const [isCliked, setIsCliked] = useState(false);
   const [isCliked2, setIsCliked2] = useState(false);
   const [isCliked3, setIsCliked3] = useState(false);
   const [isCliked4, setIsCliked4] = useState(false);
   const [isArrowVisible, setIsArrowVisible] = useState(false);

   const handleImage = () => {
    setIsCliked(!isCliked)
    setIsArrowVisible(!isArrowVisible)
   }

   const handleImage2 = () => {
    setIsCliked2(!isCliked2)
    setIsArrowVisible(!isArrowVisible)

   }
   const handleImage3 = () => {
    setIsCliked3(!isCliked3)
    setIsArrowVisible(!isArrowVisible)

   }
   const handleImage4 = () => {
    setIsCliked4 (!isCliked4)
    setIsArrowVisible(!isArrowVisible)

   }



  return (
    <div className='engeeniersattendancecard-main'>
      <div className='engeeniersattendancecard-left'>
        <button id='checkin'>Check in</button>
        <div  onClick={handleImage} className={isCliked ? "engeeniersattendancefullImage" : "engeeniersattendancecard-box"}>
            <img src="https://images.unsplash.com/photo-1567871268919-93826fc4ddad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <div onClick={handleImage2} className={isCliked2 ? "engeeniersattendancefullImage" : "engeeniersattendancecard-box"}>
            <img src="https://images.unsplash.com/photo-1559830319-0b6adb6827ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <button>Check Out</button>
        <div onClick={handleImage3} className={isCliked3 ? "engeeniersattendancefullImage" : "engeeniersattendancecard-box2"}>
            <img src="https://images.unsplash.com/photo-1716872491847-03c73619a25d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <div onClick={handleImage4} className={isCliked4 ? "engeeniersattendancefullImage" : "engeeniersattendancecard-box2"}>
            <img src="https://images.unsplash.com/photo-1716470061387-d32570b54e69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>



      </div>
      <div className='engeeniersattendancecard-right'>
        <div className='engeeniersattendancecard-right-inner'>
            <button>Location</button>
            <IoCloseOutline onClick={onClose}  className="closeIconengeeniersattendancecard" />
            <img onClick={onClose} style={{display : isArrowVisible ? "block" : "none"}}
             className='Arrow-engeeniersattendancecard' src={Arrow} alt="" />


        </div>

        <div className='engeeniersattendancecard-right-inner2'>
        <div className="engeeniersattendancecard-description-section">
            <div className="engeeniersattendancecard-more-descriptive">
              <EnggLocation />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EngeeniersAttendanceCard
