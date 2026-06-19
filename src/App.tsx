import {useState} from 'react'

interface Task {
  id: number;
  text: string;
  completed: boolean;
}


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    const newTask: Task = {
      id: Date.now(),
      text: 'Empty',
      completed: false,
    }
    setTasks(prev => [...prev, newTask]);
  }

  return (
    <div className='main-container'>
      <button className='addTask'
      onClick={addTask}>Add Task</button>
      <ul className='task-list'>
      {tasks.map(task => (
        <li key={task.id} className='task'></li>
      ))}  
      </ul>
    </div>
  )
}

export default App
