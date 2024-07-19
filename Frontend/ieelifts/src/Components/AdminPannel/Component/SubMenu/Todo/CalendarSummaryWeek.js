import { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
const CalendarSummaryWeek = ()=>{
    const [currentWeek, setCurrentWeek] = useState([]);
    useEffect(() => {
        generateCurrentWeek(new Date());
      }, []);
    
      const generateCurrentWeek = (date) => {
        const startOfWeek = new Date(date);
        const dayOfWeek = startOfWeek.getDay();
        const difference = dayOfWeek === 0 ? 6 : dayOfWeek - 1; 
        startOfWeek.setDate(date.getDate() - difference);
        const week = [];
        for (let i = 0; i < 6; i++) { 
          week.push(new Date(startOfWeek));
          startOfWeek.setDate(startOfWeek.getDate() + 1);
        }
        setCurrentWeek(week);
      };
      const extractDayDateMonth = (date) => {
          const day = date.toLocaleString('default', { weekday: 'long' });
          const month = date.toLocaleString('default', { month: 'long' });
          const dayOfMonth = date.getDate();
          return { day, month, dayOfMonth };
        };
    return(
       <div className='all-task-container'>
          {
            currentWeek.map((task, index)=>{
                const { day:dayName,dayOfMonth } = extractDayDateMonth(task);
                return(
                    <div className='task-container' key={index}>
            <div className='task-date-container'>{dayOfMonth}<br/> {dayName.slice(0,3)} </div>
            <div className='calendar-summary-border'></div>
            <div className='meetings-wrapper'>
                <div className='meetings-flex'>
                <div><span>4</span> <span>Meetings</span> </div>
                </div>
                <div className='meetings-flex'>
                <div><span>2</span> <span>Callbacks</span></div>       
                </div>
            </div>
            <div className='calendar-summary-border'></div>
            <div className='icon-container'>
            <RiArrowDropDownLine className='dropdownIcon'/>
            </div>
        </div>
                )
            })
          }
        
        </div> 
    )
}

export default CalendarSummaryWeek;