import React, { useState } from 'react'
import CalendarSummaryWeek from './CalendarSummaryWeek';
import CalendarSummaryDay from './CalendarSummaryDay';
 const CalendarSummary = () => {
    const [activeView,setAcitveView] = useState('week')
   const dayWeekToggle = (view) => {
        setAcitveView(view)
   }
  return (
   <div className='calendar-summary'>
       <div className='calendar-summary-heading'>
       Calender Summary
       </div>
       <div className='calendar-schedules'>
        <div className='dot-parent'>
        <div className='calendar-schedules-dot'></div>
        Schedules
        </div>
        <div className='calendar-schedules-date'>
        19 April 2024
        </div>
        
       </div>
       <div className='day-week-container'>
           <div className='day-week-button'>
                <div className={`day-button ${activeView==="day"?"day-week-active":""}`} onClick={()=>dayWeekToggle('day')}>
                    Day
                </div>
                <div className={`week-button ${activeView==="week"?"day-week-active":""}`} onClick={()=>dayWeekToggle('week')}>
                    Week
                </div>
           </div>
        </div>
          {activeView==="day"?(<CalendarSummaryDay/>):activeView==="week"?(<CalendarSummaryWeek/>):""}
       
   </div>
  )
}
export default CalendarSummary;
