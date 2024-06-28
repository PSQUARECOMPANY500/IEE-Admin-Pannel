import React, { useRef, useState,useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import WeekCalendarTask from "./WeekCalendarTask";

const WeekCalender = ({ setTodayDate,data }) => {   //todo : //make the name same as props when pass parent to child or child to parent
  const AMonthyearRef = useRef(null);
  const [acurrentDate, setACurrentDate] = useState(new Date());
  const [aselectedDate, setASelectedDate] = useState(null);
  const [currentWeek, setCurrentWeek] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
 
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
    setStartDate(formatDate(week[0]));
    setEndDate(formatDate(week[5]));
  };

  const changeWeek = (direction) => {
    const newDate = new Date(currentWeek[0]);
    newDate.setDate(newDate.getDate() + direction * 6);
    generateCurrentWeek(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
 
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} ${month.slice(0,3)}`;
  };

  const extractDayDateMonth = (date) => {
    const day = date.toLocaleString('default', { weekday: 'long' });
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear(); 
    const dayOfMonth = date.getDate();
    return { day, month, dayOfMonth, year };
  };
  
  const AhandlePrevClick = () => {
    setACurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };
  const date = new Date();

  const AhandleNextClick = () => {
    setACurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };
  const ahandleDayClick = (day) => {
    const newSelectedDate = new Date(
      Date.UTC(acurrentDate.getFullYear(), acurrentDate.getMonth(), day)
    );
    setASelectedDate(newSelectedDate);
    const formattedDate = newSelectedDate.toLocaleDateString("en-IN");
    setTodayDate(formattedDate);
  };

  return (
    <div className="Todocalendar-week">
      <div className="Todo-header-main">
        <div className="headers Todo-header">
          <button id="aprevBtn" onClick={AhandlePrevClick}>
            <FaChevronLeft />
          </button>
          <h2 id="monthYearTodo" ref={AMonthyearRef}>
            Month Year
          </h2>
          <button id="anextBtn" onClick={AhandleNextClick}>
            <FaChevronRight id="ArrowSize"/>
          </button>
        </div>
      
      </div>
       <div className="week-date-container">
         <span onClick={() => changeWeek(-1)}><FaChevronLeft className="font-size"/></span> <span>{startDate}-{endDate}</span> <span onClick={() => changeWeek(2)}>< FaChevronRight className="font-size"/></span>
       </div>
       {
        currentWeek.map((day,index)=>{
          const { day: dayName, month, dayOfMonth,year } = extractDayDateMonth(day);
          return(
            <WeekCalendarTask day={dayName} month={month} date={dayOfMonth} isToday={isToday(day)} key={index} year={year} data={data}/>
          )
        })
       }
    </div>
  );
};

export default WeekCalender;
