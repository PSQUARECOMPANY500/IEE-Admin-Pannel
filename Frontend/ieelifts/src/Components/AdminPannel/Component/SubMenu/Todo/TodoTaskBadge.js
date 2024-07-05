import React, { useEffect, useState } from 'react'
import BadgeBubble from './BadgeBubble';
import { deleteTodo, updateStatus } from '../../../../../ReduxSetup/Actions/AdminActions';
import toast from "react-hot-toast";
const TodoTaskBadge = ({task,handleTaskUpdate}) => {
  const [status, setStatus] = useState();
  const getTodayDate = () =>{
    let date = new Date();
     return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
 }
 const checkUpcomingDate = (todayDate, taskDate) => {
  const [todayDay, todayMonth, todayYear] = todayDate.split('/').map(Number);
  const [taskDay, taskMonth, taskYear] = taskDate.split('/').map(Number);
  const today = new Date(todayYear, todayMonth - 1, todayDay);
  const task = new Date(taskYear, taskMonth - 1, taskDay);
  return task >= today;
}
  function tConvert (time) {
    time = time?.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice (1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
      time[0] = +time[0] % 12 || 12; 
    }
    return time.join (''); 
  }
  const compareTime = () => {
    const currentTime = new Date();
    const [taskDate, taskTime] = [task?.taskDate, task?.taskTime];
    const taskDateTimeParts = taskTime?.split(/[: ]/);
    const taskHours = taskDateTimeParts[2] === 'PM' && taskDateTimeParts[0] !== '12' ? +taskDateTimeParts[0] + 12 : +taskDateTimeParts[0];
    const taskMinutes = +taskDateTimeParts[1];
    
    const [taskDay, taskMonth, taskYear] = taskDate.split('/').map(Number);
    const taskDateTime = new Date(taskYear, taskMonth - 1, taskDay, taskHours, taskMinutes);

    if (checkUpcomingDate(getTodayDate(), taskDate) && currentTime >= taskDateTime) {
        setStatus('Completed');
    } else if (checkUpcomingDate(getTodayDate(), taskDate) && currentTime < taskDateTime) {
        setStatus('upcoming');
    } else {
        setStatus('missed');
    }
    return status;
}
  useEffect(()=>{
    compareTime()
  },[task])
   const handleDelete =async ()=>{
   await deleteTodo(task?._id);
    toast.success("Task deleted successfully")
     handleTaskUpdate();  
   }
   const handleUpdateStatus =async()=>{
    await updateStatus(task?._id);
     toast.success("Task status updated successfully")
      handleTaskUpdate();
   }
  return ( 
     <div className="todo-task-badge">
    <div className="todo-task-badge-task">
       {task?.taskName}
    </div>
    <div className="todo-task-badge-time">
    {tConvert(task?.taskTime)}
    </div>
    <div className={`todo-task-badge-dot ${status==='upcoming'?"todo-task-badge-dot-yellow":""} ${task?.status==="Completed"?"todo-task-badge-dot-green":""}`}></div>
    <BadgeBubble handleDelete={handleDelete} handleUpdateStatus={handleUpdateStatus} status={task?.status}/>
 </div>
  )
}

export default TodoTaskBadge
