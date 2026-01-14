import { useEffect, useRef, useState } from 'react'
import TaskItem from './TaskItem'
import '../styles/TaskList.css'

const VISIBLE = 3

const TaskList = ({ tasks, deleteTask }) => {
  const trackRef = useRef(null)
  const itemRef = useRef(null)

  const [index, setIndex] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (itemRef.current) {
      setItemWidth(itemRef.current.offsetWidth)
    }
  }, [tasks.length])

  useEffect(() => {
    if (tasks.length === 0) return
    setIndex(i => i % tasks.length)
  }, [tasks.length])

  useEffect(() => {
    if (!trackRef.current || !itemWidth || animating) return
    trackRef.current.style.transition = 'none'
    trackRef.current.style.transform = `translateX(-${itemWidth}px)`
  }, [tasks.length, itemWidth, animating])

  if (tasks.length === 0) return null

  const prev = (index - 1 + tasks.length) % tasks.length
  const next = (index + VISIBLE) % tasks.length

  const windowTasks = []
  windowTasks.push(tasks[prev])
  for (let i = 0; i < VISIBLE; i++) {
    windowTasks.push(tasks[(index + i) % tasks.length])
  }
  windowTasks.push(tasks[next])

  const slideNext = () => {
    if (animating || !itemWidth) return
    setAnimating(true)
    trackRef.current.style.transition = 'transform 0.4s ease'
    trackRef.current.style.transform = `translateX(-${itemWidth * 2}px)`
  }

  const onTransitionEnd = () => {
    trackRef.current.style.transition = 'none'
    trackRef.current.style.transform = `translateX(-${itemWidth}px)`
    setIndex(i => (i + 1) % tasks.length)
    setAnimating(false)
  }

  return (
    <div className="carousel">
      <button className="arrow" onClick={slideNext}>→</button>

      <div className="track-wrapper">
        <div
          className="track"
          ref={trackRef}
          onTransitionEnd={onTransitionEnd}
          style={{ transform: `translateX(-${itemWidth}px)` }}
        >
          {windowTasks.map((task, i) => (
            <div
              className="task_list"
              ref={i === 1 ? itemRef : null}
              key={`${task.id}-${i}`}
            >
              <TaskItem
                id={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                createdAt={task.createdAt}
                deleteTask={deleteTask}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskList
