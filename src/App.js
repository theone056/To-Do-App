import './App.css';
import TaskForm from './components/TaskForm';
import Task from './components/Task';
import { useEffect, useState } from 'react';
function App() {
  const [tasks, setTask] = useState([]);

  useEffect(()=> {
    if(tasks.length === 0) return;
    localStorage.setItem("tasks",JSON.stringify(tasks));
  },[tasks])

  useEffect(()=>{
    const localTasks = JSON.parse(localStorage.getItem("tasks"));
    if(localTasks === null) localStorage.setItem("tasks", JSON.stringify([]));
    setTask(localTasks);
  },[])

  const onAdd = (name)=> {
    setTask((prev)=>{
      return [...prev, {taskName: name, isChecked:false}]
    })
  }

  const UpdateCheckBox = (index,checked) => {
    setTask((prev)=>{
      const newTask = [...prev];
      newTask[index].isChecked = checked;
      return newTask;
    })
  }

  const HandleDelete = (name) => {
    setTask((prev)=>{
      const newTask = [...prev].filter(value=> value.taskName !== name);
      return newTask;
    });
  }

  return (
    <>
    <h1>{tasks.filter(x=>x.isChecked == true).length}/{tasks.length} Complete</h1>
    <div className='formContainer'>
       <TaskForm onAdd={onAdd}/>
       {tasks && (tasks.map((task,index)=>
        (<Task 
                key={task.taskName + index} 
                taskName={task.taskName} 
                isChecked={task.isChecked}
                onToggleCheckBox={(checked)=> UpdateCheckBox(index,checked)}
                onDeleteTask={(name)=> HandleDelete(name)}/>)
       ))}
      
    </div>
    </>
  );
}

export default App;
