import React from 'react'
import { useEffect , useState } from 'react'

import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import {getTasksAPI, deleteTaskAPI, createTaskAPI, editTaskAPI} from './services/api.js'

const App = () => {
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    getTasksAPI().then(setTasks);},[]);

  const deleteTask = async (id) =>{
    const deletedTask = await deleteTaskAPI(id)
    setTasks(currTasks => currTasks.filter((task) => task.id !== id))
  }

  const createTask= async (title, description, priority) =>{
    try{
      const createdTask = await createTaskAPI(title,description,priority)
      setTasks(currTasks => [...currTasks,createdTask])
    }catch(err){
      alert(err.error)
    }

  }
  const editTask= async (id, title, description, priority) =>{
    const updatedTask = await editTaskAPI(id, title, description, priority)
    setTasks(currTasks => currTasks.map((task) => task.id === taskID ? {...task, ...updatedTask}: task ))
  }

  return (
    <div>
      <TaskForm createTask={createTask} editTask={editTask}/>
      <TaskList tasks={tasks} deleteTask={deleteTask}/>
    </div>
  )
}

export default App
