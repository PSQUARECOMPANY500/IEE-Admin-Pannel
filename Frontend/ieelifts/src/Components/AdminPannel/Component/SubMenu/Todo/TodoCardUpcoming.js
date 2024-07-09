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
      const getUpcomingData = () => {
        const todayDate = getTodayDate();
        const hours = getHours();
        const minutes = getMinutes();
        const currentTime = `${hours}:${minutes}`;
        const formattedTime = tConvert(currentTime);
    
        let upcomingTasks = todoData?.filter(todo => {
            if (todo.taskDate >= todayDate) {
                const time =todo.taskTime.split(" ")[0]
                const [taskHour, taskMinute] = time.split(":").map(Number);
                const [currentHour, currentMinute] = formattedTime.split(":").map(Number);
                return taskHour > currentHour || (taskHour === currentHour && taskMinute >= currentMinute);
            }
        });
    
        upcomingTasks?.sort((a, b) => {
            if (a.taskDate !== b.taskDate) {
                return new Date(a.taskDate) - new Date(b.taskDate);
            }
            const [aHour, aMinute] = a.taskTime.split(":").map(Number);
            const [bHour, bMinute] = b.taskTime.split(":").map(Number);
            return aHour - bHour || aMinute - bMinute;
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
     function tConvert(time) {
        time = time?.toString().match(/^([01]?\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) {
            time = time.slice(1);
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
            time[0] = (+time[0] % 12 || 12).toString().padStart(2, '0');
        }
        return time.join(''); 
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
                    <div className="single-todo-task" key={todo._id}>
                <div className="single-todo-task-data">
                   <div className="todo-data-sub">
                   <span className="todo-task-number">{tConvert(todo?.taskTime)}</span>
                    <div className="todo-text-container">
                        <div className="todo-text">
                        {todo.taskName}
                        </div>
                        <div className="todo-text">
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
        </div>
    </div>
    )
}

export default TodoCardUpcoming;