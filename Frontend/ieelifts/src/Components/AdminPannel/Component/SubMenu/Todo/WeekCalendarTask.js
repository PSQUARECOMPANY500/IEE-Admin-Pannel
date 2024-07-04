import React, { useEffect, useState } from 'react'
import TodoTaskBadge from './TodoTaskBadge'

const monthMap = {
  "January": 1,
  "February": 2,
  "March": 3,
  "April": 4,
  "May": 5,
  "June": 6,
  "July": 7,
  "August": 8,
  "September": 9,
  "October": 10,
  "November": 11,
  "December": 12
};
const WeekCalendarTask = ({ day, month, date, isToday, data, year,handleTaskUpdate }) => {
  const [currentMonth, setCurrentMonth] = useState(null);
  const [visibleTasks, setVisibleTasks] = useState([]);
  useEffect(() => {
    setCurrentMonth(monthMap[month]);
  }, [month]);

  useEffect(() => {
    if (currentMonth !== null) {
      const formattedDate = `${date}/${currentMonth}/${year}`;
      const tasksForDate = data?.filter(item => item?.taskDate === formattedDate);
      setVisibleTasks(tasksForDate);
    }
  }, [date, currentMonth, year, data]);
  return (
    <>
      <div className="week-day-row-container">
        <div className="week-day-month-wrapper">
          <div className="todo-week-day">{day?.slice(0, 3)}</div>
          <div className="todo-week-month">{month?.slice(0, 3)}</div>
        </div>
        <div className={`todo-week-date-badge ${isToday ? "highlight" : ""}`}>
          {date}
        </div>
        <div className='week-badge-container'>
        {visibleTasks.map((task, index) => (
          <TodoTaskBadge key={index} task={task} handleTaskUpdate={handleTaskUpdate} />
        ))}
        </div>
      </div>
      <div className="custom-vr"></div>
      <div className="custom-hr"></div>
    </>
  );
}

export default WeekCalendarTask
