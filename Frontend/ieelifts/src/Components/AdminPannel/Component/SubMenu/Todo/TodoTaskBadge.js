import React, { useEffect, useState } from 'react'
import BadgeBubble from './BadgeBubble';
import { deletedTodo, deleteTodo, updateStatus } from '../../../../../ReduxSetup/Actions/AdminActions';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';


const TodoTaskBadge = ({ task, handleTaskUpdate, isMonth,handleOpenAddClick,setTaskDeleted }) => {

  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const {flag} = useSelector(state => state.AdminRootReducer.deleteTodoReducer);
  const getTodayDate = () => {
    let date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
  const checkUpcomingDate = (todayDate, taskDate) => {
    const [todayDay, todayMonth, todayYear] = todayDate.split('/').map(Number);
    const [taskDay, taskMonth, taskYear] = taskDate.split('/').map(Number);
    const today = new Date(todayYear, todayMonth - 1, todayDay);
    const task = new Date(taskYear, taskMonth - 1, taskDay);
    return task >= today;
  }

  function tConvert(time) {
    time = time?.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { 
      time = time.slice(1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
      time[0] = +time[0] % 12 || 12; 
    }
    return time.join(''); 
  }

  const compareTime = () => {
    const currentTime = new Date();
    const [taskDate, taskTime] = [task?.taskDate, task?.taskTime];
    const taskDateTimeParts = taskTime?.split(/[: ]/);
    const taskHours = taskDateTimeParts[2] === 'PM' && taskDateTimeParts[0] !== '12' ? +taskDateTimeParts[0] + 12 : +taskDateTimeParts[0];
    const taskMinutes = +taskDateTimeParts[1];

    const [taskDay, taskMonth, taskYear] = taskDate.split('/').map(Number);
    const taskDateTime = new Date(taskYear, taskMonth - 1, taskDay, taskHours, taskMinutes);

    const todayDate = getTodayDate();

    if (task?.status === "Completed") {
      setStatus('Completed');
    } else if (checkUpcomingDate(todayDate, taskDate)) {
      if (currentTime >= taskDateTime) {
        setStatus('missed');
      } else {
        setStatus('upcoming');
      }
    } else {
      setStatus('missed');
    }
  }

  useEffect(() => {
    compareTime();
  }, [task]);
  const handleDelete = async () => {
   await deleteTodo(task?._id);
    handleTaskUpdate();
    toast.success("Task deleted successfully");
    dispatch(deletedTodo(!flag))
  }

  const handleUpdateStatus = async () => {
    await updateStatus(task?._id);
    toast.success("Task status updated successfully");
    handleTaskUpdate();
  }

  const modifiedTask = (task) => {
    if (isMonth && task.length < 15) {
      return task;
    } else if (isMonth && task.length > 15) {
      return task.slice(0, 13) + "...";
    } else {
      return task;
    }
  }
  return (
    <div className="todo-task-badge">
      <div className="todo-task-badge-task">
        {modifiedTask(task.taskName)}
      </div>
      <div className="todo-task-badge-time">
        {tConvert(task?.taskTime)}
      </div>
      <div className={`todo-task-badge-dot ${status === 'upcoming' ? "todo-task-badge-dot-yellow" : ""} ${status === "Completed" ? "todo-task-badge-dot-green" : ""} ${status === "missed" ? "todo-task-badge-dot-red" : ""}`}></div>
      <BadgeBubble handleDelete={handleDelete} handleUpdateStatus={handleUpdateStatus} status={task?.status} handleOpenAddClick={handleOpenAddClick} id={task._id}/>
    </div>
  )
}

export default TodoTaskBadge
