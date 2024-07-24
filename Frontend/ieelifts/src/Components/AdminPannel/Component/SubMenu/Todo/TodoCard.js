import React, { useState, useEffect } from "react";
import { getTodo } from "../../../../../ReduxSetup/Actions/AdminActions";
import { CgCheckO } from "react-icons/cg";
import {jwtDecode} from "jwt-decode";

const TodoCard = ({ taskAdded, taskUpdated }) => {

    const [todoData, setTodoData] = useState([]);
    const [completedTodo, setCompletedTodo] = useState([]);
    const token = localStorage.getItem("adminData");
    let decoded;
    try {
        decoded = jwtDecode(token);
    } catch (error) {
        console.error("Token decoding failed:", error);
    }
    useEffect(() => {
        const getData = async () => {
            if (decoded && decoded.user && decoded.user.AdminId) {
                try {
                    const data = await getTodo(decoded.user.AdminId);
                    setTodoData(data?.data);
                } catch (error) {
                    console.error("Fetching todo data failed:", error);
                }
            }
        };
        getData();
    }, [taskAdded,taskUpdated]);
    const formatDate = (date) => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const getCompletedTasks = () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const formattedYesterday = formatDate(yesterday);
        const formattedToday = formatDate(today);
        const completedTasks = todoData.filter(task => 
            task.status === "Completed" && 
            (task.taskDate === formattedYesterday || task.taskDate === formattedToday)
        );
        completedTasks.sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate));
        setCompletedTodo(completedTasks);
    };
    useEffect(() => {
        getCompletedTasks();
    }, [taskAdded, todoData]);
    function tConvert(time) {
        time = time?.toString().match(/^([01]?\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) {
            time = time.slice(1);
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
            time[0] = (+time[0] % 12 || 12).toString().padStart(2, '0');
        }
        return time.join(''); 
    }    
    return (
        <div className="todo-card">
            <div className="todo-card-header">
                <div className="todo-card-header-child-one">Complete</div>
                <div className="todo-number-of-task">
                    {completedTodo.length}
                </div>
            </div>
            <div className="todo-card-body">
                {completedTodo?.map((task, ) => (
                    <div className="single-todo-task" key={task._id}>
                        <div className="single-todo-task-data">
                            <div className="todo-data-sub">
                                <span className="todo-task-number">{tConvert(task.taskTime)}</span>
                                <div className="todo-text-container">
                                    <div className="todo-text">
                                        {task.taskName}
                                    </div>
                                    <div className="todo-text">
                                        {task.taskDate}
                                    </div> 
                                </div>
                            </div>
                            <div><CgCheckO className="todo-completed-check" /></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoCard;
