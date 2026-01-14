import express from 'express'
const router = express.Router();
const priorities = ['low', 'medium', 'high']
let tasks = [
  {
    "id": 1,
    "title": "Stare at the fridge",
    "description": "Open the fridge, stare intensely, close it without taking anything.",
    "completed": true,
    "createdAt": "2026-01-12",
    "priority": "low"
  },
  {
    "id": 2,
    "title": "Forget why I stood up",
    "description": "Walk into another room and completely forget the original mission.",
    "completed": false,
    "createdAt": "2026-01-13",
    "priority": "medium"
  },
  {
    "id": 3,
    "title": "Google something I already know",
    "description": "Just to double-check. Still correct. Feel validated.",
    "completed": true,
    "createdAt": "2026-01-13",
    "priority": "low"
  },
  {
    "id": 4,
    "title": "Argue with myself in the shower",
    "description": "Win the argument using points I definitely should’ve said years ago.",
    "completed": false,
    "createdAt": "2026-01-14",
    "priority": "high"
  },
  {
    "id": 5,
    "title": "Rewatch the same 3-minute video",
    "description": "Miss the important part every single time.",
    "completed": false,
    "createdAt": "2026-01-14",
    "priority": "medium"
  }
]

// Get all tasks:
router.get('/', (req,res) => {
    res.status(200).json(tasks);
})

// Post new task
router.post('/', (req,res) => {
    console.log(req.body)

    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
        createdAt: new Date().toISOString().split("T")[0], // shorts the date to look like 2026-01-01
        priority: req.body.priority
    }

    if (!newTask.title || !newTask.description || !priorities.includes(newTask.priority)){
        return res.status(400).json({ error: "Make sure all fields are filled and priorty is either low, medium or high"})
    }
    tasks.push(newTask)
    res.status(201).json(newTask)
})

// Update task
router.put('/:id', (req,res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).json({ error: "Invalid Id"})
    }

    const task = tasks.find((task) => task.id === id)
    if(!task){
        return res.status(404).json({ error: `Task with id: ${id} was not found`})
    }

    const {title, description, priority} = req.body
    if(!title || !description || !priorities.includes(priority)){
        return res.status(400).json({ error: "Missing task details"})
    }

    task.title = title
    task.description = description
    task.priority = priority

    res.status(200).json(task)

})

// Delete Task
router.delete('/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    
    if(isNaN(id)){
        return res.status(400).json({ error: "Invalid Id"})
    
    }
    const task = tasks.find((task) => task.id === id)
    
    if(!task){
        return res.status(404).json({ error: `Task with id: ${id} was not found`})
    }

    tasks = tasks.filter((task) => task.id !== id)
    res.status(200).json(task)
})

// Patch task
router.patch('/:id/toggle', (req,res) =>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).json({ error: "Invalid Id"})
    }
    const task = tasks.find((task) => task.id === id)


    if(!task){
        return res.status(404).json({ error: `Task with id: ${id} was not found`})
    }
    task.completed = !task.completed
    res.status(200).json(task)
})

export default router