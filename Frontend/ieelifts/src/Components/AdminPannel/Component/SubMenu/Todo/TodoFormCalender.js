import { useEffect, useRef, useState } from "react";
import { createRoot } from 'react-dom/client';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactDOM from "react-dom";
import TodoTaskBadge from "./TodoTaskBadge";
import store from "../../../../../ReduxSetup/Store";
import { Provider } from "react-redux";
// import { useDispatch } from "react-redux";

const TodoFormCalendar = ({ setTodayDate, tasks = [],handleTaskUpdate,handleOpenAddClick,setTaskDeleted}) => {
  // const dispatch = useDispatch();
  const ACalendarRef = useRef(null);
  const AMonthyearRef = useRef(null);
  const ADayContainerRef = useRef(null);
  const [acurrentDate, setACurrentDate] = useState(new Date());
  const [aselectedDate, setASelectedDate] = useState(null);
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
      acurrentDate.getFullYear(),
      acurrentDate.getMonth(),
      day
    );
    setASelectedDate(newSelectedDate);

    const formattedDate = newSelectedDate.toLocaleDateString("en-IN");
    setTodayDate(formattedDate);
  };



const acreateDayElement = (day) => {
  const date = new Date(
    acurrentDate.getFullYear(),
    acurrentDate.getMonth(),
    day
  );
  const dayElement = document.createElement("div");
  dayElement.classList.add("todoaday");

  if (date.toDateString() === new Date().toDateString()) {
    dayElement.classList.add("current");
  }
  if (
    aselectedDate &&
    date.toDateString() === new Date(aselectedDate).toDateString()
  ) {
    dayElement.classList.add("selected");
  }
  const tasksForTheDay = tasks.filter((task) => {
    const [day, month, year] = task.taskDate.split('/').map(Number);
    const taskDate = new Date(year, month - 1, day);
    return taskDate.toDateString() === date.toDateString();
  });

  if (tasksForTheDay.length > 0) {
    dayElement.classList.add("has-task");
  }

  dayElement.textContent = day;
  dayElement.addEventListener("click", () => {
    ahandleDayClick(day);
  });

  const tasksContainer = document.createElement("div");
  tasksContainer.classList.add("tasks-container");

  if (tasksForTheDay.length > 0) {
    const badgeContainer = document.createElement("div");
    tasksContainer.appendChild(badgeContainer);

    // Create a root container and render the component
    const root = createRoot(badgeContainer);
    root.render(
      <Provider store={store}>
        <TodoTaskBadge task={tasksForTheDay[0]} handleTaskUpdate={handleTaskUpdate} isMonth={true} handleOpenAddClick={handleOpenAddClick} setTaskDeleted={setTaskDeleted}/>
      </Provider>)
  }
  dayElement.appendChild(tasksContainer);
  ADayContainerRef.current.appendChild(dayElement);
};


  //day element end

  const ArenderCalendar = () => {
    if (!ADayContainerRef.current) {
      return;
    }

    ADayContainerRef.current.innerHTML = "";
    const firstDay = new Date(
      acurrentDate.getFullYear(),
      acurrentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      acurrentDate.getFullYear(),
      acurrentDate.getMonth() + 1,
      0
    );

    AMonthyearRef.current.textContent = `${acurrentDate.toLocaleString(
      "default",
      {
        month: "long",
      }
    )} ${acurrentDate.getFullYear()}`;

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          
    const daysHeader = document.createElement("div");
    daysHeader.classList.add("days-header-todo");

    daysOfWeek.forEach((dayOfWeek) => {
      const dayHeader = document.createElement("div");
      dayHeader.textContent = dayOfWeek;
      daysHeader.appendChild(dayHeader);
    });

    ADayContainerRef.current.appendChild(daysHeader);

    const firstDayIndex = firstDay.getDay();

    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("empty-cell");
      ADayContainerRef.current.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      acreateDayElement(day);
    }
    const lastDayIndex = (firstDayIndex + lastDay.getDate()) % 7;
    if (lastDayIndex !== 0) {
      for (let i = lastDayIndex; i < 7; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("empty-cell");
        ADayContainerRef.current.appendChild(emptyCell);
      }
    }
  };
  const DateSelect = () => {
    if (!aselectedDate) {
      return;
    }

    var surroundingDates = [];
    for (let i = 2; i > 0; i--) {
      const precedingDate = new Date(aselectedDate);
      precedingDate.setDate(aselectedDate.getDate() - i);
      surroundingDates.push(precedingDate);
    }
    surroundingDates.push(new Date(aselectedDate));
    for (let i = 1; i <= 2; i++) {
      const followingDate = new Date(aselectedDate);
      followingDate.setDate(aselectedDate.getDate() + i);
      surroundingDates.push(followingDate);
    }
  };
 
  useEffect(() => {
    ArenderCalendar();
    DateSelect();
  }, [acurrentDate, aselectedDate, tasks]);
  return (
    <div className="TodoHistory">
      <div className="Todocalendar" id="Todocalendar" ref={ACalendarRef}>
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
        <div
          className="adays-todo"
          id="daysContainer"
          ref={ADayContainerRef}
        ></div>
      </div>
    </div>
  );
};

export default TodoFormCalendar;
