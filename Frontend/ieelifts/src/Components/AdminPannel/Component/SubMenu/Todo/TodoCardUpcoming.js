import React, {useEffect, useState} from "react";
import { getTodo } from "../../../../../ReduxSetup/Actions/AdminActions";
import { jwtDecode } from "jwt-decode";

const TodoCardUpcoming = ({taskAdded})=>{
     const [todoData,setTodoData] = useState();
     const token = localStorage.getItem("adminData");
     const decoded = jwtDecode(token);
     const [upcomingTodo,setUpcomingTodo]= useState();
    
     const getTodayDate = () =>{
        let date = new Date();
         return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
     }
      const getHours = () =>{
        let date = new Date();
        return date.getHours()
      }
      const getMinutes = () =>{
        let date = new Date();
        return date.getMinutes()
      }
      console.log(getMinutes())
      const getUpcomingData = () => {
        const todayDate = getTodayDate();
        const hours = getHours();
        const minutes = getMinutes();
        const currentTime = `${hours}:${minutes}`;
    
        let upcomingTasks = todoData?.filter(todo => {
            if (todo.taskDate !== todayDate) {
                return false;
            }
            const [taskHour, taskMinute] = todo.taskTime.split(":").map(Number);
            const [currentHour, currentMinute] = currentTime.split(":").map(Number);
    
            return taskHour > currentHour || (taskHour === currentHour && taskMinute >= currentMinute);
        });
    
        setUpcomingTodo(upcomingTasks);
    };
     useEffect(()=>{
        const getData = async() =>{
            const data = await getTodo(decoded.user.AdminId);
            setTodoData(data.data);
         }
         getData();
     },[taskAdded])
    
     useEffect(()=>{
        getUpcomingData()
     },[todoData])

     function tConvert (time) {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) {
          time = time.slice (1);
          time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
          time[0] = +time[0] % 12 || 12; 
        }
        return time.join (''); 
      }
    return(
        <div className="todo-card">
        <div className="todo-card-header todo-upcoming">
            <div className="todo-card-header-child-one ">Upcoming</div>
            <div className="todo-number-of-task">
                {upcomingTodo?.length}
            </div>
        </div>
        <div className="todo-card-body">
             {
              upcomingTodo && upcomingTodo.map((todo)=>(
                    <div className="single-todo-task">
                <div className="single-todo-task-data">
                   <div className="todo-data-sub">
                   <span className="todo-task-number">{tConvert(todo?.taskTime)}</span>
                    <div className="todo-text-container">
                        <div className="todo-text">
                        {/* Client meeting to discuss customization requests */}
                        {todo.taskName}
                        </div>
                        <div className="todo-text">
                        {/* 28/02/2024 */}
                        {todo.taskDate}
                        </div>
                    </div>
                   </div>
                    {todo.priority === "Urgent" ? ( <div className="todo-urgent-badge">Urgent</div>): (null)}
                </div>
                <div>
                </div>  
            </div>
                ))
             }
            {/* <div className="single-todo-task">
                <div className="single-todo-task-data">
                   <div className="todo-data-sub">
                   <span className="todo-task-number">1</span>
                    <div className="todo-text-container">
                        <div className="todo-text">
                        Client meeting to discuss customization requests
                        </div>
                        <div className="todo-text">
                        28/02/2024
                        </div>
                    </div>
                   </div>
                </div>
                <div>
                </div>
            </div>
            <div className="single-todo-task">
                <div className="single-todo-task-data">
                   <div className="todo-data-sub">
                   <span className="todo-task-number">1</span>
                    <div className="todo-text-container">
                        <div className="todo-text">
                        Client meeting to discuss customization requests
                        </div>
                        <div className="todo-text">
                        28/02/2024
                        </div>
                    </div>
                   </div>
                </div>
                <div>
                </div>
            </div> */}
        </div>
    </div>
    )
}

export default TodoCardUpcoming;