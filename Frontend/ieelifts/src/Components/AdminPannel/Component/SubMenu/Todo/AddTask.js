import React, { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { LuPlus } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { GoCalendar } from "react-icons/go";
import ClientFormCalendar from "../../ClientsSubComponent/ClientsReusableComponent/ClientFormCalendar";
import { addTodo, getTodo } from "../../../../../ReduxSetup/Actions/AdminActions";
import { toast } from "react-hot-toast";
import TodoDropdown from "./TodoDropdown";
const AddTask = ({ onClose,setFlag}) => {
  const [openCalender, setOpenCalender] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  let statusOption = ["In Progress","Completed","Ongoing","In review"];
  let priorityOption = ["Urgent","High","Medium","Low"];
  const token = localStorage.getItem("adminData");
  const decoded = jwtDecode(token);
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
    taskTime:false
  });
  const handleDropdownChange = (name,data) =>{
    setTodo({...todo, [name]:data});
  }
  const handleDateChange = (date) => {
     setTodo((prev)=>(
        {
            ...prev,
            taskDate: date
        }
     ))
     setOpenCalender(false)
  };
  const handleInputChange = (event)=>{
    const { name, value } = event.target;
    setTodo((prev)=>(
        {
           ...prev,
            [name]:value
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
        taskTime: todo.taskTime === ""
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
    if (todo.status === "") {
      toast.error("Please select status");
      return false;
    }
    if (todo.priority === "") {
      toast.error("Please select priority");
      return false;
    }
    if (todo.taskTime === "") {
      toast.error("Please select time");
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

   

    const addTask = async (e)=>{
        
        e.preventDefault();
       if(validate()){
        const response = await addTodo(todo)
        if(response && response.status==200){
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
   
  return (
    <div className="addTask-main">
      <div className="addtask-upper">
        <div className="create-task">
          {" "}
          <p>Create Task</p>
          <RxCross1 onClick={onClose} className="closeAddtask" />
        </div>
        <form onSubmit={addTask}>
          <div className="task-content">
            <div className="task-content-inner">
              <p>Task Name</p>
              <input
                type="text"
                placeholder="Enter Task name"
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
                />
              <GoCalendar
                className="calenderIcon"
                onClick={() => handleOpenCalender()}
              />
            </div>
            <div className="task-content-inner">
              <p>Time</p>
              <input
                type="time"
                placeholder="Enter Time"
                value={todo.taskTime}
                onChange={handleInputChange}
                name="taskTime"
                className={errors.taskTime ? "validateInput" : ""}
              />
            </div>
           
            <div className="ClientFormCalendar-todo" ref={calendarRef}>
              {openCalender && (
                <ClientFormCalendar setTodayDate={handleDateChange} />
              )}
            </div>
            {/* <div className="task-content-inner">
              <p>Status</p>
              <select
                id="todoInput"
                name="status"
                placeholder="Ongoing"
                value={todo.status}
                onChange={handleInputChange}
                className={errors.status ? "validateInput" : "" }
              >    <option value="">Select Status</option>
                 <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Completed">Completed</option>
                <option value="In review">In review</option>
              </select>
            </div>

            <div className="task-content-inner">
              <p>Priority</p>
              <select
                id="todoInput"
                name="priority"
                placeholder="High"
                value={todo.priority}
                onChange={handleInputChange}
                className={errors.priority ? "validateInput" : ""}
              >
                 <option value="">Select Priority</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
              </select>
            </div> */}
             <div className="task-input-wrapper">
             <TodoDropdown label={"Select Status"} options={statusOption} onValueChange={handleDropdownChange} name={"status"} errors={errors.status}/>
             </div>
             <div>
             <TodoDropdown label={"Select Priority"} options={priorityOption} onValueChange={handleDropdownChange} name={"priority"} errors={errors.priority}/>
             </div>
          </div>

          <div className="addtask-bottom">
            <button>
              <p>Create Task 1</p>
              <LuPlus className="plusIcon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;