import React from 'react'
import { useState } from 'react'

const TaskForm = ({createTask, editTask}) => {
    const [mode, setMode] = useState("");

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("")
    const [newPriority, setNewPriority] = useState("");

    const handleCreate = () =>{
        createTask(newTitle,newDescription,newPriority)
        setNewTitle("")
        setNewDescription("")
        setNewPriority("")
        setMode("")
    }
    return (

        <div className='task_form'>
            {mode === "creating" ? (
                <>
                    <input className='create_title' type="text" placeholder='Title' value={newTitle}
                    onChange={(event) => setNewTitle(event.target.value)}/>

                    <input className='create_priority' type="text" placeholder='Priorty - low, medium, high' value={newPriority}
                    onChange={(event) => setNewPriority(event.target.value)} />

                    <textarea className='create_description' type="text" placeholder='Description' value={newDescription}
                    onChange={(event) => setNewDescription(event.target.value)}></textarea>

                    <button className='create_new_button' onClick={() => handleCreate()}>Create</button>

                    <button className='cancle_new_button' onClick={() => setMode("")}>Cancel</button>
                </>
            ): mode === "editing" ?(
                <>
                    <input type="number" />
                    <input className='edit_title' type="text" />
                    <input className='edit_priority' type="text" />
                    <textarea className='edit description' type="text"></textarea>
                    
                </>
            ):
                
            (
                <>
                    <button className='create_task_button' onClick={() => setMode("creating")}>Create new task</button>
                    <button className='edit_task_button'>Edit Task</button>
                </>

            )

            }

        </div>
    )
}

export default TaskForm
