import CalendarSummaryWeek from './CalendarSummaryWeek';
import CalendarSummaryDay from './CalendarSummaryDay';
import React,{useState,useEffect}from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
 const CalendarSummary = () => {
  const [currentWeek, setCurrentWeek] = useState([]);
    const [activeView,setAcitveView] = useState('day')
   const dayWeekToggle = (view) => {
        setAcitveView(view)
   }
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
    //   setStartDate(formatDate(week[0]));
    //   setEndDate(formatDate(week[5]));
    };
    const extractDayDateMonth = (date) => {
        const day = date.toLocaleString('default', { weekday: 'long' });
        const month = date.toLocaleString('default', { month: 'long' });
        const dayOfMonth = date.getDate();
        return { day, month, dayOfMonth };
      };
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
