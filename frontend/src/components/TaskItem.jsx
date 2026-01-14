import React from 'react'

import { useState } from 'react'

import '../styles/TaskItem.css'
const TaskItem = ({id = 0, title = 'Task title', description = 'Task description', createdAt = '2026-01-12',
     priority = 'low',
    deleteTask}) => {
    
    const [complete, setComplete] = useState(false);
    const [deleting, setDeleting] = useState();
    
    const handleDelete =() => {
        deleting && deleteTask(id)
        setDeleting((prev) => !prev)
    }

    return (
    <div className='task_item'>
        {deleting ?(
            <h1 className='are_you_sure_delete'>Are you sure you want to delete?
                <button className='yes_delete' onClick={() => handleDelete()}>Yes</button>
                <button className='no_delete' onClick={() => setDeleting((prev) => !prev)}>No</button>
            </h1>
        ):
        <>
            <h1 className='task_item_title'>{title}</h1>
            <h2 className='task_item_description'>{description}</h2>
            <p className='task_item_completed' >Completed {complete ? 'true ' : 'false '}
                <button className='toggle_button' onClick={() => setComplete((prev) => !prev)}>Toggle</button>
            </p>

            <p className='task_item_priority' >Priority: {priority}</p>
            <p className='task_item_created_at'>Created at: {createdAt}</p>
            <button className='delete_button' onClick={() => handleDelete()}>Delete</button>
        </>
        }
    </div>
    )
}

export default TaskItem
