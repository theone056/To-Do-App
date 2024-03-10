import React, { useState } from 'react'

const TaskForm = ({onAdd}) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(taskName);
  }

  return (
    <form onSubmit={handleSubmit}>
        <input className='task-input' type='text' value={taskName} onChange={(e)=>setTaskName(e.target.value)} placeholder='Your next task...'/>
        <button className='task-button'>Add</button>
    </form>
  )
}

export default TaskForm