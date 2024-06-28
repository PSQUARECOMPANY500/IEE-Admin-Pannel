import React, { useState,useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import TodoFormCalender from "./TodoFormCalender";
import AddTask from "./AddTask";
import CalendarSummary from "./CalenderSummary";
import { MdOutlineCalendarViewMonth } from "react-icons/md";
import { LuStretchHorizontal } from "react-icons/lu";
import { IoTodayOutline } from "react-icons/io5";
import WeekCalender from "./WeekCalender";
import DayCalender from "./DayCalender";
import TodoCard from "./TodoCard";
import TodoCardUpcoming from "./TodoCardUpcoming";
import { getTodo } from "../../../../../ReduxSetup/Actions/AdminActions";  //todo : // to plese correct the nomenclecture (same name as Action)
import { jwtDecode } from "jwt-decode";

const Todo = () => {
  const [todo,setTodo] = useState();
  const [selectedView, setSelectedView] = useState("Month");
  const [selectedDate, setSelectedDate] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [taskAdded,setTaskAdded] = useState(false)
  const token = localStorage.getItem("adminData");
  const decoded = jwtDecode(token);
  const handleOpenAddClick = () => {
    setIsOpen(true);
  };
  const handleCloseAddClick = () => {
    setIsOpen(false);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleViewClick = (view) => {
    setSelectedView(view);
  };

  useEffect(()=>{
    const getData = async ()=>{
       const data =  await getTodo(decoded.user.AdminId)
       setTodo(data.data);
    }
    getData()
    setTaskAdded(false)
 },[taskAdded])
  return (
    <div>
      <div className="sub_todo_view">
        <div className="todo_table-container">
          <div
            className="todo_table_top"
            style={{
              height: "4rem",
              width: "100%",
              marginLeft: "0rem",
              borderBottom: "1px solid #70707057",
            }}
          >
            <h2>My Task</h2>
            <button onClick={handleOpenAddClick}>
              <p>Add Task</p>
              <LuPlus className="plusIcon" />
            </button>
          </div>

          <div className="todoStatus">
            <div className="todoStatus-child">
              <div className="todo_green_circle"></div>
              <p>Complete</p>
            </div>
            <div className="todoStatus-child">
              <div
                style={{ backgroundColor: "#F8AC1D" }}
                className="todo_green_circle"
              ></div>
              <p>Scheduled</p>
            </div>
            <div className="todoStatus-child">
              <div
                style={{ backgroundColor: "#C10000" }}
                className="todo_green_circle"
              ></div>
              <p>Missed</p>
            </div>
          </div>

          <div className="TodoDates">
            <div
              style={{ borderBottom: selectedView === "Month" ? "2px solid #F8AC1D" : "1px solid #7070702E" }}
              className="TodoDates-inner"
              onClick={() => handleViewClick("Month")}
            >
              <MdOutlineCalendarViewMonth />
              <p>Month</p>
            </div>
            <div style={{borderBottom: selectedView === "Week" ? "2px solid #F8AC1D" : "1px solid #7070702E"}}
            onClick={() => handleViewClick("Week")}
             className="TodoDates-inner">
              <LuStretchHorizontal />
              <p>Week</p>
            </div>
            <div style={{borderBottom:selectedView === "Day" ? "2px solid #F8AC1D" : "1px solid #7070702E"}}
            onClick={() => handleViewClick("Day")}
             className="TodoDates-inner">
              <IoTodayOutline />

              <p>Day</p>
            </div>
          </div>
          <div 
           className="TodoformWrapper"
          >           
            {selectedView === "Month" && <TodoFormCalender setTodayDate={handleDateChange} tasks={todo} />}
            {selectedView === "Week" && <WeekCalender setTodayDate={handleDateChange} data={todo}/>}
            {selectedView === "Day" && <DayCalender setTodayDate={handleDateChange} tasks={todo}/>}
            <CalendarSummary />
          </div>
        </div>
      </div>
      <div className="todo-card-parent">
            <TodoCard/>
            <TodoCardUpcoming/>
        </div>
      <div>{isOpen && <AddTask onClose={handleCloseAddClick} data={todo} setFlag={setTaskAdded}/>}</div>
    </div>
  );
};

export default Todo;
