import React from 'react'

const TodoTaskBadge = (task) => {
  function tConvert (time) {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) {
      time = time.slice (1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
      time[0] = +time[0] % 12 || 12; 
    }
    return time.join (''); 
  }
  return (
    <div className="todo-task-badge">
    <div className="todo-task-badge-task">
       {task?.task?.taskName}
    </div>
    <div className="todo-task-badge-time">
    {tConvert(task?.task?.taskTime)}
    </div>
    <div className="todo-task-badge-dot"></div>
    
 </div>
  )
}

export default TodoTaskBadge
