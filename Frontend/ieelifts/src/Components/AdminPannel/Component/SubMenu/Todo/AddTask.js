import React, { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { LuPlus } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { GoCalendar } from "react-icons/go";
import { addTodo, getTodoById, updateTodoDataById } from "../../../../../ReduxSetup/Actions/AdminActions";
import { toast } from "react-hot-toast";
import TodoDropdown from "./TodoDropdown";
import TodoAddCalendar from "./TodoAddCalendar";
import { useSelector } from "react-redux";
import TimeComponent from "./TimeComponent";
const AddTask = ({ onClose, setFlag, isupdate }) => {
  const [openCalender, setOpenCalender] = useState(false);
  // const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  let statusOption = ["In Progress", "Completed", "Ongoing", "In review"];
  let priorityOption = ["Urgent", "High", "Medium", "Low"];
  const token = localStorage.getItem("adminData");
  const decoded = jwtDecode(token);
  const { id, flag } = useSelector(state => state.AdminRootReducer.updateTodoDataReducer)
  const [todo, setTodo] = useState({
    taskName: "",
    memberId: "",
    status: "",
    priority: "",
    taskDate: "",
    taskTime: "",
    adminId: decoded.user.AdminId
  })
  const [errors, setErrors] = useState({
    taskName: false,
    memberId: false,
    taskDate: false,
    status: false,
    priority: false,
    taskTime: false
  });
  const handleDropdownChange = (name, data) => {
    setTodo({ ...todo, [name]: data });
  }
  const handleDateChange = (date) => {
    setTodo((prev) => (
      {
        ...prev,
        taskDate: date
      }
    ))
    setOpenCalender(false)
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTodo((prev) => (
      {
        ...prev,
        [name]: value
      }
    ))
  }
  const validate = () => {
    const newErrors = {
      taskName: todo.taskName === "",
      memberId: todo.memberId === "",
      taskDate: todo.taskDate === "",
      status: todo.status === "",
      priority: todo.priority === "",
      taskTime: todo.taskTime === "0:00 AM"
    };

    setErrors(newErrors);

    if (todo.taskName === "") {
      toast.error("Please enter task name");

      return false;
    }
    if (todo.memberId === "") {
      toast.error("Please enter member id");
      return false;
    }
    if (todo.taskDate === "") {
      toast.error("Please add date");
      return false;
    }
    if (todo.taskTime === "0:00 AM") {
      toast.error("Please select time");
      return false;
    }
    if (todo.status === "") {
      toast.error("Please select status");
      return false;
    }
    if (todo.priority === "") {
      toast.error("Please select priority");
      return false;
    }

    return true;
  }
  const handleOpenCalender = () => {
    setOpenCalender(true);
  };
  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setOpenCalender(false);
    }
  };

  useEffect(() => {
    if (openCalender) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCalender]);

  const addTask = async () => {
    if (validate()) {
      const response = await addTodo(todo)
      if (response && response.status == 200) {
        toast.success("Task added successfully");
      }
      setTodo({
        taskName: "",
        memberId: "",
        status: "",
        priority: "",
        taskDate: "",
        taskTime: "",
        adminId: decoded.user.AdminId
      })
    }
    setFlag(true);
  }
  const getTaskById = async (id) => {
    const response = await getTodoById(id)
    if (response) {
      setTodo(response?.data)
    }
  }
  useEffect(() => {
    if (flag) {
      getTaskById(id)
    }
  }, [id])

  const updateTodo = async (id, todo) => {
    const response = await updateTodoDataById(id, todo);
    if (response && response.status == 200) {
      toast.success("Task updated successfully");
    }
    setFlag(true);
    onClose();
  }
  const handleTimeChange = (time) => {
    setTodo((prev) => ({
      ...prev,
      taskTime: time
    }));
  };
  return (
    <div className="addTask-main">
      <div className="addtask-upper">
        <div className="create-task">
          {" "}
          <p>{flag ? "Update Task" : "Create Task"}</p>
          <RxCross1 onClick={onClose} className="closeAddtask" />
        </div>

        <div className="task-content">
          <div className="task-content-inner">
            <p>Task Name</p>
            <input
              type="text"
              placeholder="Enter Task name"
              autoComplete="off"
              value={todo.taskName}
              onChange={handleInputChange}
              name="taskName"
              className={errors.taskName ? "validateInput" : ""}
            />
          </div>
          <div className="task-content-inner">
            <p>Member</p>
            <input
              type="text"
              placeholder="Enter Member id"
              autoComplete="off"
              value={todo.memberId}
              onChange={handleInputChange}
              name="memberId"
              className={errors.memberId ? "validateInput" : ""}

            />
          </div>
          <div className="task-content-inner">
            <p>Date</p>
            <input type="text" placeholder="dd-mm-yy" value={todo.taskDate}
              name="taskDate"
              className={errors.taskDate ? "validateInput" : ""}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <GoCalendar
              className="calenderIcon"
              onClick={() => handleOpenCalender()}
            />
          </div>

          <div className="todo-time-container">
            <p>Time</p>
            <TimeComponent onTimeChange={handleTimeChange} taskTime={todo.taskTime} errors={errors.taskTime} />
          </div>

          <div className="ClientFormCalendar-todo" ref={calendarRef}>
            {openCalender && (
              <TodoAddCalendar setTodayDate={handleDateChange} />
            )}
          </div>
          <div className="task-input-wrapper">
            <TodoDropdown label={"Select Status"} options={statusOption} onValueChange={handleDropdownChange} name={"status"} errors={errors.status} value={todo.status} />
          </div>
          <div>
            <TodoDropdown label={"Select Priority"} options={priorityOption} onValueChange={handleDropdownChange} name={"priority"} errors={errors.priority} value={todo.priority} />
          </div>
        </div>
        <div className="addtask-bottom">
          {
            flag ? (
              <button onClick={() => updateTodo(id, todo)}>Update Task</button>
            ) : (
              <button onClick={addTask}>Add Task</button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default AddTask;