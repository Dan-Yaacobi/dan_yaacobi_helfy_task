import express from 'express'
import tasks from './routes/tasks.js'
import cors from 'cors'
const app = express();
const port = 4000;

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true,}))

app.use('/api/tasks', tasks)

app.listen(port, () => console.log(`Server running on port ${port}`))