import React, {useEffect, useState} from "react";
import { getTodo } from "../../../../../ReduxSetup/Actions/AdminActions";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
const TodoCardUpcoming = ({taskAdded})=>{
     const [todoData,setTodoData] = useState();
     const token = localStorage.getItem("adminData");
     const decoded = jwtDecode(token);
     const [upcomingTodo,setUpcomingTodo]= useState();
     const {flag} = useSelector(state => state.AdminRootReducer.deleteTodoReducer);
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
        
        const convertTo24Hour = (time) => {
            const [timePart, modifier] = time.split(' ');
            let [hours, minutes] = timePart.split(':');
            if (hours === '12') {
                hours = '00';
            }
            if (modifier === 'PM') {
                hours = parseInt(hours, 10) + 12;
            }
            return `${hours}:${minutes}`;
        };
    
        let upcomingTasks = todoData?.filter(todo => {
            if (todo.taskDate === todayDate) {
                const taskTime24 = convertTo24Hour(todo.taskTime);
                const [taskHour, taskMinute] = taskTime24.split(":").map(Number);
                const [currentHour, currentMinute] = currentTime.split(":").map(Number);
                return taskHour > currentHour || (taskHour === currentHour && taskMinute >= currentMinute);
            }
        });
         
        upcomingTasks?.sort((a, b) => {
            const aTime24 = convertTo24Hour(a.taskTime);
            const bTime24 = convertTo24Hour(b.taskTime);
            const [aHour, aMinute] = aTime24.split(":").map(Number);
            const [bHour, bMinute] = bTime24.split(":").map(Number);
            return aHour - bHour || aMinute - bMinute;
        });
    
        setUpcomingTodo(upcomingTasks);
    };
    
    
    const getData = async() =>{
        const data = await getTodo(decoded?.user?.AdminId);
        setTodoData(data?.data);
     }
     useEffect(()=>{
         getData();
     },[taskAdded,flag])
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