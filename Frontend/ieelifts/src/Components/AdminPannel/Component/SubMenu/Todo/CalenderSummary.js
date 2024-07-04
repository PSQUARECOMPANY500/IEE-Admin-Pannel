import CalendarSummaryWeek from './CalendarSummaryWeek';
import CalendarSummaryDay from './CalendarSummaryDay';
import React,{useState,useEffect}from 'react'
 const CalendarSummary = () => {
  const [currentWeek, setCurrentWeek] = useState([]);
    const [activeView,setAcitveView] = useState('day')
    const [month,setMonth] = useState();
    const [date,setDate] = useState();
    const [year,setYear] = useState();
   const dayWeekToggle = (view) => {
        setAcitveView(view)
   }
    useEffect(() => {
      generateCurrentWeek(new Date());
      setCurrentDate();
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

     const setCurrentDate = ( ) =>{
        setDate(new Date().toLocaleDateString('en-US', { day: 'numeric' }))
        setMonth(new Date().toLocaleDateString('en-US', { month: 'long' }))
        setYear(new Date().getFullYear())
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
        { 
          `${date} ${month} ${year}`
        }
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
