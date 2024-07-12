import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TodoTaskBadge from "./TodoTaskBadge";

const DayCalender = ({ tasks, handleTaskUpdate, handleOpenAddClick }) => {
  const AMonthyearRef = useRef(null);
  const [acurrentDate, setACurrentDate] = useState(new Date());
  const [aselectedDate, setASelectedDate] = useState(new Date());

  const getCurrentFormattedDate = () => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return acurrentDate.toLocaleDateString("en-US", options);
  };

  const generateTimeSlots = () => {
    const startTime = new Date();
    startTime.setHours(9, 30, 0);
    const endTime = new Date();
    endTime.setHours(19, 30, 0);
    const timeSlots = [];
    const currentTime = new Date(startTime);
    while (currentTime <= endTime) {
      timeSlots.push(currentTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
      currentTime.setMinutes(currentTime.getMinutes() + 60);
    }
    return timeSlots;
  };

  useEffect(() => {
    if (AMonthyearRef.current) {
      const options = {
        month: "long",
        year: "numeric",
      };
      const formattedMonthYear = acurrentDate.toLocaleDateString("en-US", options);
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

  const parseTaskDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const isTaskInTimeSlot = (task, slotTime) => {
    const taskDate = parseTaskDate(task.taskDate);
    const selectedDate = aselectedDate;

    if (
      taskDate.getFullYear() === selectedDate.getFullYear() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getDate() === selectedDate.getDate()
    ) {
      const [taskTime, taskPeriod] = task.taskTime.split(' ');
      const [taskHours, taskMinutes] = taskTime.split(':').map(Number);
      let task24Hour = taskHours % 12 + (taskPeriod === 'PM' ? 12 : 0);

      const taskTimeDate = new Date();
      taskTimeDate.setHours(task24Hour, taskMinutes, 0, 0);

      const [slotTimeStr, slotPeriod] = slotTime.split(' ');
      const [slotHours, slotMinutes] = slotTimeStr.split(':').map(Number);
      let slot24Hour = slotHours % 12 + (slotPeriod === 'PM' ? 12 : 0);

      const slotTimeDate = new Date();
      slotTimeDate.setHours(slot24Hour, slotMinutes, 0, 0);
      const nextSlotTimeDate = new Date(slotTimeDate);
      nextSlotTimeDate.setHours(slotTimeDate.getHours() + 1);

      return taskTimeDate >= slotTimeDate && taskTimeDate < nextSlotTimeDate;
    }
    return false;
  };

  const [hasContent, setHasContent] = useState(false);
  useEffect(() => {
    const myDiv = document.getElementById('badge-container');
    if (myDiv && myDiv.textContent.trim() !== "") {
      setHasContent(true);
    }
  }, [tasks]);

  const divStyle = {
    minHeight: hasContent ? '0' : '2rem',
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
        <span> {getCurrentFormattedDate()}</span>
      </div>
      <div className="time-slots">
        {generateTimeSlots().map((timeSlot, index) => (
          <React.Fragment key={index}>
            <div className="time-row">
              <div className="time-row-time">{timeSlot}</div>
              <div className="time-row-hr"></div>
            </div>
            <div className="badge-container" id="badge-container" style={divStyle}>
              {tasks
                .filter((task) => isTaskInTimeSlot(task, timeSlot))
                .map((task, taskIndex) => (
                  <TodoTaskBadge key={taskIndex} task={task} handleTaskUpdate={handleTaskUpdate} isMonth={false} handleOpenAddClick={handleOpenAddClick}/>
                ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DayCalender;
