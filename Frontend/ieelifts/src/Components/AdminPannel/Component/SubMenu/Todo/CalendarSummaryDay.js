import { RiArrowDropDownLine } from "react-icons/ri";
const CalendarSummaryDay = ()=> {
    return (
        <div className="time-task-container">
            <div className="task-time">10:00Am-11:00Am</div>
            <div className="calendar-summary-time-border"></div>
            <div className='meetings-flex-time'>
            <div><span><span>1</span> <span className="meeting-name"> Meeting</span> </span></div>
             </div>
             <div className='calendar-summary-time-border'></div>
             <div className='icon-day-container'>
         <RiArrowDropDownLine className='dropdownIcon'/>
     </div>
        </div>
    )
}

export default CalendarSummaryDay;