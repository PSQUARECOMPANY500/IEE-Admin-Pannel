import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TodoTaskBadge from "./TodoTaskBadge";

const DayCalender = ({setTodayDate}) => {
    const AMonthyearRef = useRef(null);
  const [acurrentDate, setACurrentDate] = useState(new Date());
  const [aselectedDate, setASelectedDate] = useState(null);

  const getCurrentFormattedDate = () => {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return acurrentDate.toLocaleDateString('en-US', options);
  };
  const generateTimeSlots = () => {
    const startTime = new Date();
    startTime.setHours(9, 30, 0); 
    const endTime = new Date();
    endTime.setHours(19, 30, 0);

    const timeSlots = [];
    const currentTime = new Date(startTime);

    while (currentTime <= endTime) {
      timeSlots.push(currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
      currentTime.setMinutes(currentTime.getMinutes() + 60);
    }

    return timeSlots;
  };
  useEffect(() => {
    if (AMonthyearRef.current) {
      const options = {
        month: 'long',
        year: 'numeric'
      };
      const formattedMonthYear = acurrentDate.toLocaleDateString('en-US', options);
      AMonthyearRef.current.textContent = formattedMonthYear;
    }
  }, [acurrentDate]);


    const AhandlePrevClick = () => {
        setACurrentDate((prevDate) => {
          const newDate = new Date(prevDate);
          newDate.setMonth(prevDate.getMonth() - 1);
          return newDate;
        });
      };

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
    
        // const formattedDate = newSelectedDate.toISOString().split('T')[0];
        const formattedDate = newSelectedDate.toLocaleDateString("en-IN");
        setTodayDate(formattedDate);
      };


  return (
    <div className="Todocalendar-day">
      <div className="Todo-header-main">
        <div className="headers Todo-header">
          <button id="aprevBtn" onClick={AhandlePrevClick}>
            <FaChevronLeft />
          </button>
          <h2 id="monthYearTodo" ref={AMonthyearRef}>
            Month Year
          </h2>
          <button id="anextBtn" onClick={AhandleNextClick}>
            <FaChevronRight id="ArrowSize" />
          </button>
        </div>
      </div>
      <div className="today-date">
        {getCurrentFormattedDate()}
      </div>
      <div className="time-slots">
        {generateTimeSlots().map((timeSlot, index) => (
         <>
          <div className="time-row" key={index}>
            <div className="time-row-time">{timeSlot}</div>
            <div className="time-row-hr"></div>
          </div>
            {index%2==0?<div className="TodoTaskBageContainer"><TodoTaskBadge /></div>:""}
         </>
        ))}
      
      </div>
    </div>
  );
};

export default DayCalender;
