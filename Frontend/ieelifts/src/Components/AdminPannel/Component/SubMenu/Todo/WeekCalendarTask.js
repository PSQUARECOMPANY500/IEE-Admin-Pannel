import React from 'react'
import TodoTaskBadge from './TodoTaskBadge'

const WeekCalendarTask = ({day,month,date,isToday}) => {
  return (
   <>
   <div className="week-day-row-container">
         <div className="week-day-month-wrapper">
           <div className="todo-week-day">{day.slice(0,3)}</div>
           <div className="todo-week-month">{month.slice(0,3)}</div>
         </div>
         <div className={`todo-week-date-badge ${isToday?"highlight":""}`}>
          {date}
         </div>
       <TodoTaskBadge/>
      </div>
        <div className="custom-vr"></div>
       <div className="custom-hr"></div>
   </>
  )
}

export default WeekCalendarTask
