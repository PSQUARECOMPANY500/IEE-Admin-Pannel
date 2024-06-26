import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import TodoFormCalender from "./TodoFormCalendar";
import TodoCard from "./TodoCard";
import TodoCardUpcoming from "./TodoCardUpcoming";
import CalendarSummary from "./CalendarSummary";
import AddTask from "./AddTask";

const Todo = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenAddClick = () => {
    setIsOpen(true)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleCloseAddClick = () => {
    setIsOpen(false)
  }


  return (
    <div>
      <div className="sub_todo_view">
        <div className="todo_table-container">
          <div
            className="todo_table_top"
            style={{
              height: "4rem",
              width: "100%",
              marginLeft: "-2rem",
              borderBottom: "1px solid #70707057",
            }}
          >
            <h2>My Task</h2>
            <button onClick={handleOpenAddClick}>
              <p>Add Task</p>
              <LuPlus className="plusIcon" />
            </button>
          </div>

          <div className="TodoformWrapper">
            <TodoFormCalender setTodayDate={handleDateChange}/>
            <CalendarSummary/>
          </div>
        </div>
        
      </div>
      <div className="todo-card-parent">
            <TodoCard/>
            <TodoCardUpcoming/>
        </div>
      <div>
        {isOpen && <AddTask onClose={handleCloseAddClick}/>}
      </div>
    </div>
  );
};

export default Todo;
